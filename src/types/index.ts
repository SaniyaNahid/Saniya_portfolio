/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface Skill {
  name: string;
  category: 'Languages' | 'AI & ML' | 'Frameworks & Libs' | 'Cloud & DevOps' | 'Other';
  level: number; // 0 to 100
  iconName?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'AI/ML' | 'Web App' | 'Library' | 'System';
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string; // "Present" or date
  description: string[];
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Email' | 'Resume';
  url: string;
  iconName: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
