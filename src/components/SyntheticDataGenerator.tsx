import { useState } from "react";
import { Sparkles, Play, Download, Settings, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const templates = [
  {
    id: "customer-service",
    name: "Customer Service Dialogs",
    description: "Generate realistic customer support conversations",
    category: "Text",
    parameters: ["tone", "complexity", "industry"]
  },
  {
    id: "code-comments",
    name: "Code Documentation",
    description: "Generate code comments and documentation",
    category: "Code",
    parameters: ["language", "style", "detail_level"]
  },
  {
    id: "tabular-data",
    name: "Tabular Records",
    description: "Generate structured data with custom schemas",
    category: "Structured",
    parameters: ["columns", "data_types", "constraints"]
  },
  {
    id: "medical-notes",
    name: "Medical Case Studies",
    description: "Generate anonymized medical case studies",
    category: "Healthcare",
    parameters: ["specialty", "complexity", "privacy_level"]
  }
];

export function SyntheticDataGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [outputCount, setOutputCount] = useState("100");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Synthetic Data Generation</h2>
        <p className="text-muted-foreground">Create high-quality synthetic datasets using AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Generation Templates
              </CardTitle>
              <CardDescription>
                Choose a template or create custom prompts for data generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">{template.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.parameters.map((param) => (
                        <Badge key={param} variant="secondary" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Custom Prompt</CardTitle>
              <CardDescription>
                Provide specific instructions for data generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the type of data you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Count</label>
                  <Input
                    type="number"
                    value={outputCount}
                    onChange={(e) => setOutputCount(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select defaultValue="json">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="txt">Text</SelectItem>
                      <SelectItem value="parquet">Parquet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Generation Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isGenerating ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Generating...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Using Amazon Q Developer and SageMaker
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button 
                    onClick={handleGenerate}
                    disabled={!selectedTemplate && !prompt}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Generate Data
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Ready to generate synthetic data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Recent Generations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Customer Dialogs", count: "1,000", status: "Complete", time: "2 min ago" },
                { name: "Code Comments", count: "500", status: "Complete", time: "1 hour ago" },
                { name: "Medical Cases", count: "250", status: "Complete", time: "3 hours ago" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.count} records</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-1">
                      {item.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 mt-1">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}