-- SQL Schema script for Supabase Database
-- Run this script in your Supabase SQL Editor to set up tables for Hmm Studio

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Audio Items (Sonic Logos, Brand Anthems, Podcast Audio, Commercial Songs, Jingles, Extras)
CREATE TABLE IF NOT EXISTS audio_items (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "coverImage" TEXT,
    duration TEXT,
    description TEXT,
    "caseStudy" JSONB,
    tags TEXT[],
    "isFeatured" BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    "createdAt" DATE DEFAULT CURRENT_DATE
);

-- Table: Video Items (Behind the scenes, Video Sound Design)
CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT DEFAULT 'extras',
    type TEXT DEFAULT 'video',
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    description TEXT,
    published BOOLEAN DEFAULT true,
    "createdAt" DATE DEFAULT CURRENT_DATE
);

-- Table: Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    author TEXT DEFAULT 'Hmm Studio Editorial',
    "readTime" TEXT DEFAULT '4 min read',
    published BOOLEAN DEFAULT true,
    "createdAt" DATE DEFAULT CURRENT_DATE
);

-- Enable Row Level Security (RLS)
ALTER TABLE audio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read audio_items" ON audio_items FOR SELECT USING (published = true);
CREATE POLICY "Public read videos" ON videos FOR SELECT USING (published = true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (published = true);

-- Authenticated Admin Policies (Full Access for Authenticated Users)
CREATE POLICY "Admin full access audio_items" ON audio_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access videos" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Enable Supabase Realtime for instant auto-sync across the website
ALTER PUBLICATION supabase_realtime ADD TABLE audio_items;
ALTER PUBLICATION supabase_realtime ADD TABLE videos;
ALTER PUBLICATION supabase_realtime ADD TABLE blog_posts;

