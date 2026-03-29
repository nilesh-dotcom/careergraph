-- ============================================
-- CareerGraph.ai - Database Schema
-- ============================================
-- Run this in Supabase SQL Editor to set up the database

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create career_reports table
CREATE TABLE public.career_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  report_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (AUTH.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (AUTH.uid() = id);

-- Create RLS policies for career_reports
CREATE POLICY "Users can view their own reports" ON public.career_reports
  FOR SELECT USING (AUTH.uid() = user_id);

CREATE POLICY "Users can insert their own reports" ON public.career_reports
  FOR INSERT WITH CHECK (AUTH.uid() = user_id);

CREATE POLICY "Users can update their own reports" ON public.career_reports
  FOR UPDATE USING (AUTH.uid() = user_id);

CREATE POLICY "Users can delete their own reports" ON public.career_reports
  FOR DELETE USING (AUTH.uid() = user_id);

-- Create indexes for faster queries
CREATE INDEX idx_career_reports_user_id ON public.career_reports(user_id);
CREATE INDEX idx_career_reports_created_at ON public.career_reports(created_at DESC);

-- Create trigger to update the profiles table when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_career_reports_updated_at
  BEFORE UPDATE ON public.career_reports
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
