import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, FileText, Video, Link, Search, ExternalLink } from "lucide-react";

const Documentation = () => {
  const sections = [
    {
      title: "Getting Started",
      description: "Quick start guides and tutorials",
      icon: BookOpen,
      items: [
        { name: "Platform Overview", type: "guide", updated: "2 days ago" },
        { name: "First Dataset Setup", type: "tutorial", updated: "1 week ago" },
        { name: "API Authentication", type: "guide", updated: "3 days ago" }
      ]
    },
    {
      title: "Data Management",
      description: "Dataset handling and processing",
      icon: FileText,
      items: [
        { name: "Dataset Browser Guide", type: "guide", updated: "1 day ago" },
        { name: "Data Quality Metrics", type: "reference", updated: "5 days ago" },
        { name: "Synthetic Data Generation", type: "tutorial", updated: "1 week ago" }
      ]
    },
    {
      title: "ML Pipelines",
      description: "Pipeline creation and management",
      icon: Video,
      items: [
        { name: "Pipeline Architecture", type: "guide", updated: "3 days ago" },
        { name: "Custom Components", type: "tutorial", updated: "1 week ago" },
        { name: "Monitoring & Alerts", type: "reference", updated: "2 days ago" }
      ]
    }
  ];

  const resources = [
    { name: "API Reference", url: "#", type: "api" },
    { name: "SDK Documentation", url: "#", type: "sdk" },
    { name: "Video Tutorials", url: "#", type: "video" },
    { name: "Community Forum", url: "#", type: "community" }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide": return "bg-blue-100 text-blue-800";
      case "tutorial": return "bg-green-100 text-green-800";
      case "reference": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          Comprehensive guides, tutorials, and reference materials for the platform.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documentation..." className="pl-10" />
        </div>
        <Button variant="outline">Browse All</Button>
      </div>

      <Separator />

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Updated {item.updated}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Additional Resources
          </CardTitle>
          <CardDescription>
            External links and supplementary materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <Button key={index} variant="outline" className="justify-between">
                {resource.name}
                <ExternalLink className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
};

export default Documentation;