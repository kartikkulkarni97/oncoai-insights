import { Database, FlaskConical, TrendingUp, Users } from "lucide-react";
import Logo from "./Logo";

interface WelcomeScreenProps {
  onExampleClick: (message: string) => void;
}

const WelcomeScreen = ({ onExampleClick }: WelcomeScreenProps) => {
  const examples = [
    {
      icon: FlaskConical,
      title: "Gene Mutations",
      description: "Find all TP53 mutations in lung adenocarcinoma patients",
      query: "What are the most common TP53 mutations in lung adenocarcinoma patients?",
    },
    {
      icon: TrendingUp,
      title: "Survival Analysis",
      description: "Compare survival outcomes for BRCA1 carriers",
      query: "Show me the survival analysis for patients with BRCA1 mutations versus wild-type",
    },
    {
      icon: Users,
      title: "Clinical Data",
      description: "Query patient demographics and treatment history",
      query: "What is the age distribution and treatment history for melanoma patients?",
    },
    {
      icon: Database,
      title: "Expression Data",
      description: "Analyze gene expression profiles across cancer types",
      query: "Compare EGFR expression levels between different cancer types",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 dna-pattern">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Cancer Genomics Intelligence
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Your AI assistant for exploring cBioPortal cancer genomics data.
          Ask questions in natural language and get insights from clinical and molecular data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onExampleClick(example.query)}
              className="group text-left p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-card/80 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <example.icon size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {example.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 p-4 bg-muted/30 rounded-xl border border-border/50">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Pro tip:</span> You can ask complex questions 
            combining clinical and molecular data. The AI understands SQL and can query the 
            cBioPortal MySQL database directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
