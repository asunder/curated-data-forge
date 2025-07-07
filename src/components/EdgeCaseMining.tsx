import { useState } from "react";
import { AlertTriangle, Search, Zap, Download, Eye, Filter, Target, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const adversarialStrategies = [
  {
    id: "bias-detection",
    name: "Bias Detection",
    description: "Identify potential demographic, cultural, or systematic biases",
    icon: Target,
    prompts: [
      "Find examples that show unfair treatment based on gender, race, or age",
      "Identify instances where certain groups are underrepresented or misrepresented",
      "Look for stereotypical assumptions or generalizations"
    ]
  },
  {
    id: "failure-modes",
    name: "Failure Mode Analysis",
    description: "Extract examples that commonly cause model failures",
    icon: AlertTriangle,
    prompts: [
      "Find edge cases where the expected output is ambiguous or contradictory",
      "Identify examples with unusual formatting, structure, or content",
      "Look for instances that violate common assumptions"
    ]
  },
  {
    id: "adversarial-examples",
    name: "Adversarial Examples",
    description: "Generate challenging examples designed to fool models",
    icon: Brain,
    prompts: [
      "Create examples with subtle but important differences",
      "Generate instances that appear similar but have different meanings",
      "Find examples with misleading context or framing"
    ]
  },
  {
    id: "outlier-detection",
    name: "Outlier Detection",
    description: "Identify statistical and semantic outliers in the dataset",
    icon: Search,
    prompts: [
      "Find examples that are significantly different from the norm",
      "Identify instances with unusual patterns or characteristics",
      "Look for examples that don't fit typical categories"
    ]
  }
];

const mockEdgeCases = [
  {
    id: 1,
    type: "bias-detection",
    severity: "high",
    title: "Gender Bias in Job Descriptions",
    description: "Job posting uses gendered language that may discourage certain applicants",
    example: "We need a rockstar developer who can handle the pressure...",
    confidence: 0.89,
    category: "Language Bias",
    dataset: "HR Job Postings",
    impact: "May reduce diversity in applicant pool"
  },
  {
    id: 2,
    type: "failure-modes",
    severity: "medium",
    title: "Ambiguous Intent Classification",
    description: "Customer query could be interpreted multiple ways",
    example: "I want to cancel my order... actually, can I change it instead?",
    confidence: 0.76,
    category: "Intent Ambiguity",
    dataset: "Customer Support Logs",
    impact: "May lead to incorrect automated responses"
  },
  {
    id: 3,
    type: "adversarial-examples",
    severity: "high",
    title: "Sentiment Manipulation",
    description: "Text appears positive but contains subtle negative indicators",
    example: "This product is absolutely perfect... for someone who enjoys disappointment",
    confidence: 0.92,
    category: "Sarcasm/Irony",
    dataset: "Product Reviews",
    impact: "May misclassify sentiment in automated systems"
  },
  {
    id: 4,
    type: "outlier-detection",
    severity: "low",
    title: "Statistical Anomaly",
    description: "Data point significantly deviates from expected distribution",
    example: "Age: 150, Income: $50,000, Occupation: Student",
    confidence: 0.95,
    category: "Data Inconsistency",
    dataset: "Demographics Survey",
    impact: "May skew statistical analysis results"
  }
];

export function EdgeCaseMining() {
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedDataset, setSelectedDataset] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("strategies");
  const [severityFilter, setSeverityFilter] = useState("all");

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setActiveTab("results");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive border-destructive bg-destructive/10";
      case "medium": return "text-warning border-warning bg-warning/10";
      case "low": return "text-info border-info bg-info/10";
      default: return "text-muted-foreground border-muted bg-muted/10";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-success";
    if (confidence >= 0.6) return "text-warning";
    return "text-destructive";
  };

  const filteredEdgeCases = severityFilter === "all" 
    ? mockEdgeCases 
    : mockEdgeCases.filter(case_ => case_.severity === severityFilter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Edge Case Mining</h2>
        <p className="text-muted-foreground">Use adversarial prompting to identify unusual, failure-prone, or biased examples</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategies">Mining Strategies</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Setup</TabsTrigger>
          <TabsTrigger value="results">Results & Findings</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Adversarial Mining Strategies
              </CardTitle>
              <CardDescription>
                Choose from pre-built strategies or create custom adversarial prompts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adversarialStrategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedStrategy === strategy.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border/50 bg-muted/20 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <strategy.icon className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-foreground">{strategy.name}</h3>
                        <p className="text-sm text-muted-foreground">{strategy.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Example Prompts:</div>
                      {strategy.prompts.slice(0, 2).map((prompt, index) => (
                        <div key={index} className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                          {prompt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Analysis Configuration</CardTitle>
                  <CardDescription>
                    Configure your edge case mining parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Dataset</label>
                      <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dataset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer-sentiment">Customer Sentiment Analysis</SelectItem>
                          <SelectItem value="product-images">Product Catalog Images</SelectItem>
                          <SelectItem value="transaction-logs">Sales Transaction Logs</SelectItem>
                          <SelectItem value="medical-papers">Medical Research Papers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mining Strategy</label>
                      <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          {adversarialStrategies.map((strategy) => (
                            <SelectItem key={strategy.id} value={strategy.id}>
                              {strategy.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Adversarial Prompt</label>
                    <Textarea
                      placeholder="Enter custom prompts to guide the edge case mining process..."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sample Size</label>
                      <Input type="number" placeholder="1000" defaultValue="1000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confidence Threshold</label>
                      <Input type="number" placeholder="0.7" defaultValue="0.7" step="0.1" min="0" max="1" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Results</label>
                      <Input type="number" placeholder="100" defaultValue="100" />
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
                    Mining Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isAnalyzing ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Running adversarial analysis on dataset
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        onClick={handleAnalyze}
                        disabled={!selectedDataset || !selectedStrategy}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Start Edge Case Mining
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Ready to identify edge cases
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Mining History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Bias Detection", dataset: "HR Data", cases: 23, time: "2 hours ago" },
                    { name: "Failure Analysis", dataset: "Support Logs", cases: 45, time: "1 day ago" },
                    { name: "Outlier Detection", dataset: "User Reviews", cases: 12, time: "3 days ago" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.dataset}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{item.cases} cases</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Edge Cases Found</h3>
              <p className="text-sm text-muted-foreground">{filteredEdgeCases.length} cases identified</p>
            </div>
            <div className="flex gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredEdgeCases.map((edgeCase) => (
              <Card key={edgeCase.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-base font-semibold">{edgeCase.title}</CardTitle>
                        <Badge className={`text-xs ${getSeverityColor(edgeCase.severity)}`} variant="outline">
                          {edgeCase.severity}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{edgeCase.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Example:</div>
                    <div className="text-sm font-mono">{edgeCase.example}</div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Confidence:</span>
                      <div className={`font-bold ${getConfidenceColor(edgeCase.confidence)}`}>
                        {(edgeCase.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <div className="font-medium">{edgeCase.category}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dataset:</span>
                      <div className="font-medium">{edgeCase.dataset}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <div className="font-medium capitalize">{edgeCase.type.replace('-', ' ')}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Potential Impact:</div>
                    <div className="text-sm text-foreground">{edgeCase.impact}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}