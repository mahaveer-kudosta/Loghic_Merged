import React from "react";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import ArticleIcon from "@mui/icons-material/Article";
import EventIcon from "@mui/icons-material/Event";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

// Dashboard views
const Dashboard = React.lazy(() => import("../../views/dashboard"));
const Profile = React.lazy(() => import("../../views/profile"));
const Companies = React.lazy(() => import("../../views/companies"));
const CompanyDetail = React.lazy(() => import("../../views/companyDetail"));
const Posts = React.lazy(() => import("../../views/posts"));
const Events = React.lazy(() => import("../../views/events"));
const Advisors = React.lazy(() => import("../../views/advisors"));
const Messages = React.lazy(() => import("../../views/messages"));
const Notifications = React.lazy(() => import("../../views/notifications"));
const Settings = React.lazy(() => import("../../views/settings"));

// Routes
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <PersonIcon />,
    route: "/dashboard/profile",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Companies",
    key: "companies",
    icon: <BusinessIcon />,
    route: "/dashboard/companies",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Companies />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Company Detail",
    key: "company-detail",
    route: "/dashboard/company/:id",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <CompanyDetail />
      </React.Suspense>
    ),
    noSidebar: true,
  },
  {
    type: "collapse",
    name: "Posts",
    key: "posts",
    icon: <ArticleIcon />,
    route: "/dashboard/posts",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Posts />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Events",
    key: "events",
    icon: <EventIcon />,
    route: "/dashboard/events",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Events />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Advisors",
    key: "advisors",
    icon: <SupportAgentIcon />,
    route: "/dashboard/advisors",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Advisors />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Messages",
    key: "messages",
    icon: <MessageIcon />,
    route: "/dashboard/messages",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Messages />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <NotificationsIcon />,
    route: "/dashboard/notifications",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Notifications />
      </React.Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <SettingsIcon />,
    route: "/dashboard/settings",
    component: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Settings />
      </React.Suspense>
    ),
  },
];

export default routes;