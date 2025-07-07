import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, Square, Clock, CheckCircle, XCircle, Settings } from "lucide-react";

const Pipelines = () => {
  const pipelines = [
    {
      id: 1,
      name: "Data Preprocessing Pipeline",
      status: "running",
      progress: 75,
      lastRun: "2 hours ago",
      duration: "1h 23m",
      stages: ["Data Ingestion", "Cleaning", "Validation", "Feature Engineering"]
    },
    {
      id: 2,
      name: "Model Training Pipeline",
      status: "completed",
      progress: 100,
      lastRun: "1 day ago",
      duration: "3h 45m",
      stages: ["Data Prep", "Model Training", "Evaluation", "Model Registry"]
    },
    {
      id: 3,
      name: "Batch Inference Pipeline",
      status: "failed",
      progress: 40,
      lastRun: "6 hours ago",
      duration: "45m",
      stages: ["Data Load", "Model Load", "Inference", "Output Storage"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Play className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "failed": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

   return (
     <DashboardLayout>
       <div className="space-y-6">
         <div>
           <h1 className="text-3xl font-bold tracking-tight">ML Pipelines</h1>
           <p className="text-muted-foreground">
             Manage and monitor your machine learning pipelines and workflows.
           </p>
         </div>

         <div className="flex gap-4">
           <Button>Create Pipeline</Button>
           <Button variant="outline">Import Pipeline</Button>
           <Button variant="outline">
             <Settings className="h-4 w-4 mr-2" />
             Configure
           </Button>
         </div>

         <Separator />

         <div className="grid gap-6">
           {pipelines.map((pipeline) => (
             <Card key={pipeline.id}>
               <CardHeader>
                 <div className="flex items-center justify-between">
                   <div>
                     <CardTitle className="flex items-center gap-2">
                       {pipeline.name}
                       <Badge 
                         variant="secondary" 
                         className={`${getStatusColor(pipeline.status)} text-white`}
                       >
                         {getStatusIcon(pipeline.status)}
                         {pipeline.status}
                       </Badge>
                     </CardTitle>
                     <CardDescription>
                       Last run: {pipeline.lastRun} • Duration: {pipeline.duration}
                     </CardDescription>
                   </div>
                   <div className="flex gap-2">
                     <Button size="sm" variant="outline">
                       <Play className="h-4 w-4" />
                     </Button>
                     <Button size="sm" variant="outline">
                       <Pause className="h-4 w-4" />
                     </Button>
                     <Button size="sm" variant="outline">
                       <Square className="h-4 w-4" />
                     </Button>
                   </div>
                 </div>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-2">
                     <span>Progress</span>
                     <span>{pipeline.progress}%</span>
                   </div>
                   <Progress value={pipeline.progress} className="h-2" />
                 </div>
                 
                 <div>
                   <h4 className="text-sm font-medium mb-2">Pipeline Stages</h4>
                   <div className="flex gap-2 flex-wrap">
                     {pipeline.stages.map((stage, index) => (
                       <Badge key={index} variant="outline">
                         {stage}
                       </Badge>
                     ))}
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
       </div>
     </DashboardLayout>
  );
};

export default Pipelines;