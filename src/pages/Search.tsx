import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, Database, FileText, Settings as SettingsIcon } from "lucide-react";

const SearchPage = () => {
  const recentSearches = [
    "customer churn dataset",
    "image classification labels",
    "synthetic financial data",
    "model performance metrics"
  ];

  const searchResults = {
    datasets: [
      {
        name: "Customer Behavior Dataset",
        description: "E-commerce customer interaction data with purchase history",
        tags: ["customer", "behavior", "ecommerce"],
        size: "2.3 GB",
        lastModified: "2 days ago"
      },
      {
        name: "Product Image Classification",
        description: "Labeled product images for multi-class classification",
        tags: ["images", "classification", "products"],
        size: "850 MB",
        lastModified: "1 week ago"
      }
    ],
    pipelines: [
      {
        name: "Data Preprocessing Pipeline",
        description: "Automated data cleaning and feature engineering",
        tags: ["preprocessing", "automation"],
        status: "active",
        lastRun: "3 hours ago"
      }
    ],
    documentation: [
      {
        name: "Dataset Quality Guidelines",
        description: "Best practices for maintaining data quality",
        tags: ["quality", "guidelines"],
        type: "guide",
        lastUpdated: "1 week ago"
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">
          Find datasets, pipelines, documentation, and more across the platform.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search datasets, pipelines, documentation..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <Button>Search</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {recentSearches.map((search, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                {search}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            Showing results for all categories
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Datasets
              </h3>
              <div className="grid gap-4">
                {searchResults.datasets.map((dataset, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{dataset.name}</CardTitle>
                      <CardDescription>{dataset.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {dataset.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {dataset.size} • {dataset.lastModified}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Pipelines
              </h3>
              <div className="grid gap-4">
                {searchResults.pipelines.map((pipeline, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                      <CardDescription>{pipeline.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {pipeline.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">{tag}</Badge>
                          ))}
                          <Badge className="bg-green-100 text-green-800">{pipeline.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last run: {pipeline.lastRun}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentation
              </h3>
              <div className="grid gap-4">
                {searchResults.documentation.map((doc, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{doc.name}</CardTitle>
                      <CardDescription>{doc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {doc.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">{tag}</Badge>
                          ))}
                          <Badge className="bg-blue-100 text-blue-800">{doc.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Updated: {doc.lastUpdated}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="datasets">
          <div className="grid gap-4">
            {searchResults.datasets.map((dataset, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{dataset.name}</CardTitle>
                  <CardDescription>{dataset.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {dataset.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {dataset.size} • {dataset.lastModified}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipelines">
          <div className="grid gap-4">
            {searchResults.pipelines.map((pipeline, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{pipeline.name}</CardTitle>
                  <CardDescription>{pipeline.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {pipeline.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">{tag}</Badge>
                      ))}
                      <Badge className="bg-green-100 text-green-800">{pipeline.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last run: {pipeline.lastRun}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="docs">
          <div className="grid gap-4">
            {searchResults.documentation.map((doc, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{doc.name}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {doc.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">{tag}</Badge>
                      ))}
                      <Badge className="bg-blue-100 text-blue-800">{doc.type}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated: {doc.lastUpdated}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </DashboardLayout>
  );
};

export default SearchPage;