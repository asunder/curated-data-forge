import { useState } from "react";
import { Database, Search, Filter, Download, Eye, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockDatasets = [
  {
    id: 1,
    name: "Customer Sentiment Analysis",
    description: "Retail customer feedback and sentiment scores from Q3 2024",
    size: "2.1 GB",
    records: "1.2M",
    type: "Text",
    quality: 92,
    source: "S3",
    tags: ["retail", "sentiment", "nlp"],
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    name: "Product Catalog Images",
    description: "High-resolution product images with metadata and annotations",
    size: "15.3 GB", 
    records: "450K",
    type: "Image",
    quality: 88,
    source: "RDS",
    tags: ["computer-vision", "retail", "catalog"],
    lastUpdated: "1 day ago"
  },
  {
    id: 3,
    name: "Sales Transaction Logs",
    description: "Transactional data with fraud detection labels",
    size: "890 MB",
    records: "3.4M",
    type: "Structured",
    quality: 95,
    source: "Common Crawl",
    tags: ["finance", "fraud-detection", "transactions"],
    lastUpdated: "5 minutes ago"
  },
  {
    id: 4,
    name: "Medical Research Papers",
    description: "Curated collection of biomedical research abstracts",
    size: "1.8 GB",
    records: "890K",
    type: "Text",
    quality: 97,
    source: "Hugging Face",
    tags: ["medical", "research", "biomedical"],
    lastUpdated: "3 days ago"
  }
];

export function DatasetBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return "text-success";
    if (quality >= 75) return "text-warning";
    return "text-destructive";
  };

  const filteredDatasets = mockDatasets.filter(dataset => 
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dataset Discovery</h2>
          <p className="text-muted-foreground">Browse and manage your data assets</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Database className="w-4 h-4 mr-2" />
          Import Dataset
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <Card key={dataset.id} className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold text-foreground mb-1">
                    {dataset.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {dataset.description}
                  </CardDescription>
                </div>
                <Star className="w-4 h-4 text-muted-foreground hover:text-warning cursor-pointer" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <div className="font-medium">{dataset.size}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Records:</span>
                  <div className="font-medium">{dataset.records}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <div className="font-medium">{dataset.type}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Quality:</span>
                  <div className={`font-bold ${getQualityColor(dataset.quality)}`}>
                    {dataset.quality}%
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {dataset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  Updated {dataset.lastUpdated}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}