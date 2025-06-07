'use client';

import * as React from 'react';
import { BookOpen, Frame, Map, Settings, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Calender',
      url: '#',
      icon: BookOpen,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ],
  projects: [
    {
      name: 'Learning English',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
    </Sidebar>
  );
}
