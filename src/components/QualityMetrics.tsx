import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const qualityMetrics = [
  {
    title: "Data Completeness",
    value: 94,
    change: +2.1,
    status: "good",
    description: "Percentage of complete records without missing values"
  },
  {
    title: "Schema Compliance",
    value: 98,
    change: +0.5,
    status: "excellent",
    description: "Adherence to defined data schemas and constraints"
  },
  {
    title: "Duplicate Detection",
    value: 87,
    change: -1.2,
    status: "warning",
    description: "Identification and handling of duplicate records"
  },
  {
    title: "Label Accuracy",
    value: 91,
    change: +3.4,
    status: "good",
    description: "Quality of annotations and labeled data"
  }
];

const recentIssues = [
  {
    dataset: "Customer Sentiment Analysis",
    issue: "Missing sentiment labels",
    severity: "medium",
    count: 1249,
    timestamp: "2 hours ago"
  },
  {
    dataset: "Product Catalog Images",
    issue: "Corrupted image files",
    severity: "high",
    count: 23,
    timestamp: "4 hours ago"
  },
  {
    dataset: "Sales Transaction Logs",
    issue: "Outlier values detected",
    severity: "low",
    count: 456,
    timestamp: "1 day ago"
  }
];

export function QualityMetrics() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-success";
      case "good": return "text-info";
      case "warning": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent": return "bg-success/10 text-success border-success/20";
      case "good": return "bg-info/10 text-info border-info/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Data Quality Metrics</h2>
        <p className="text-muted-foreground">Monitor and track data quality across your datasets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {qualityMetrics.map((metric, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Badge className={getStatusBadge(metric.status)} variant="outline">
                  {metric.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                  <div className="flex items-center gap-1">
                    {metric.change > 0 ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.change > 0 ? "text-success" : "text-destructive"
                    }`}>
                      {metric.change > 0 ? "+" : ""}{metric.change}%
                    </span>
                  </div>
                </div>
                
                <Progress value={metric.value} className="h-2" />
                
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Recent Quality Issues
          </CardTitle>
          <CardDescription>
            Issues detected across your datasets requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIssues.map((issue, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{issue.dataset}</span>
                    <Badge variant="outline" className={`text-xs ${getSeverityColor(issue.severity)} border-current`}>
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.issue}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{issue.count}</div>
                  <div className="text-xs text-muted-foreground">{issue.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}