'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Sparkles, Target, Heart, Clock, CheckCircle2 } from 'lucide-react';

interface MicroStep {
  step: string;
  estimated_minutes: number;
}

interface TaskDecomposeResponse {
  micro_steps: MicroStep[];
  focus_sprint_duration: number;
}

interface BrainDumpResponse {
  urgent: string[];
  later: string[];
  emotional_processing: string[];
}

export default function Home() {
  const [brainDumpText, setBrainDumpText] = useState('');
  const [taskText, setTaskText] = useState('');

  const [decomposeResult, setDecomposeResult] = useState<TaskDecomposeResponse | null>(null);
  const [brainDumpResult, setBrainDumpResult] = useState<BrainDumpResponse | null>(null);
  const [motivationText, setMotivationText] = useState('');
  const [overwhelmStep, setOverwhelmStep] = useState('');
  const [focusAction, setFocusAction] = useState('');

  const [loading, setLoading] = useState<string | null>(null);

  const API_URL = 'http://localhost:8000/api';

  const handleBrainDump = async () => {
    setLoading('braindump');
    try {
      const response = await fetch(`${API_URL}/braindump`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messy_thoughts: brainDumpText }),
      });
      const data = await response.json();
      setBrainDumpResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleDecompose = async () => {
    setLoading('decompose');
    try {
      const response = await fetch(`${API_URL}/decompose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_text: taskText }),
      });
      const data = await response.json();
      setDecomposeResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleMotivate = async () => {
    setLoading('motivate');
    try {
      const response = await fetch(`${API_URL}/motivate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskText }),
      });
      const data = await response.json();
      setMotivationText(data.encouragement_message);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleOverwhelm = async () => {
    setLoading('overwhelm');
    try {
      const response = await fetch(`${API_URL}/overwhelm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskText }),
      });
      const data = await response.json();
      setOverwhelmStep(data.tiny_first_step);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleFocusSprint = async () => {
    setLoading('focus');
    try {
      const response = await fetch(`${API_URL}/focus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskText }),
      });
      const data = await response.json();
      setFocusAction(data.five_minute_action);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <header className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="w-10 h-10 text-teal-600" />
            <h1 className="text-4xl font-bold text-slate-800">
              ADHD & Anxiety Copilot
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            Your compassionate AI assistant for overcoming task paralysis
          </p>
        </header>

        <Tabs defaultValue="braindump" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur">
            <TabsTrigger value="braindump" className="gap-2">
              <Brain className="w-4 h-4" />
              Brain Dump
            </TabsTrigger>
            <TabsTrigger value="task" className="gap-2">
              <Target className="w-4 h-4" />
              Task Helper
            </TabsTrigger>
            <TabsTrigger value="overwhelm" className="gap-2">
              <Heart className="w-4 h-4" />
              Overwhelm Mode
            </TabsTrigger>
            <TabsTrigger value="focus" className="gap-2">
              <Clock className="w-4 h-4" />
              Focus Sprint
            </TabsTrigger>
          </TabsList>

          <TabsContent value="braindump" className="space-y-4">
            <Card className="border-2 border-teal-200 shadow-lg bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Brain className="w-6 h-6" />
                  Brain Dump
                </CardTitle>
                <CardDescription className="text-base">
                  Pour out all your thoughts, tasks, and worries. The AI will help organize them.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Everything on my mind right now: errands, work stuff, things I'm worried about, random thoughts..."
                  className="min-h-[200px] text-base border-2 border-teal-100 focus:border-teal-300 transition-colors"
                  value={brainDumpText}
                  onChange={(e) => setBrainDumpText(e.target.value)}
                />
                <Button
                  onClick={handleBrainDump}
                  disabled={loading === 'braindump' || !brainDumpText}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6"
                >
                  {loading === 'braindump' ? 'Organizing...' : 'Organize My Thoughts'}
                </Button>
              </CardContent>
            </Card>

            {brainDumpResult && (
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-2 border-red-200 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-lg">Urgent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {brainDumpResult.urgent.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-lg">Later</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {brainDumpResult.later.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-purple-700 text-lg">Emotional Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {brainDumpResult.emotional_processing.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-purple-500 font-bold">•</span>
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="task" className="space-y-4">
            <Card className="border-2 border-green-200 shadow-lg bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Target className="w-6 h-6" />
                  Task Breakdown
                </CardTitle>
                <CardDescription className="text-base">
                  Turn any overwhelming task into manageable micro-steps.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the task you're struggling with..."
                  className="min-h-[120px] text-base border-2 border-green-100 focus:border-green-300 transition-colors"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleDecompose}
                    disabled={loading === 'decompose' || !taskText}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {loading === 'decompose' ? 'Breaking down...' : 'Break It Down'}
                  </Button>
                  <Button
                    onClick={handleMotivate}
                    disabled={loading === 'motivate' || !taskText}
                    variant="outline"
                    className="flex-1 border-2 border-green-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {loading === 'motivate' ? 'Generating...' : 'Motivate Me'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {motivationText && (
              <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
                <CardContent className="pt-6">
                  <p className="text-lg text-slate-700 italic leading-relaxed">
                    "{motivationText}"
                  </p>
                </CardContent>
              </Card>
            )}

            {decomposeResult && (
              <Card className="border-2 border-green-200 bg-white/90">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-700">Micro-Steps</CardTitle>
                    <Badge variant="outline" className="text-base px-3 py-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {decomposeResult.focus_sprint_duration} min sprint
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {decomposeResult.micro_steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-slate-800 font-medium">{step.step}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            ~{step.estimated_minutes} minutes
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="overwhelm" className="space-y-4">
            <Card className="border-2 border-pink-200 shadow-lg bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-700">
                  <Heart className="w-6 h-6" />
                  Overwhelm Mode
                </CardTitle>
                <CardDescription className="text-base">
                  When everything feels like too much, focus on just ONE tiny step.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's overwhelming you right now?"
                  className="min-h-[120px] text-base border-2 border-pink-100 focus:border-pink-300 transition-colors"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
                <Button
                  onClick={handleOverwhelm}
                  disabled={loading === 'overwhelm' || !taskText}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg py-6"
                >
                  {loading === 'overwhelm' ? 'Finding your first step...' : 'Show Me ONE Tiny Step'}
                </Button>
              </CardContent>
            </Card>

            {overwhelmStep && (
              <Card className="border-4 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50 shadow-xl">
                <CardContent className="pt-8 pb-8">
                  <p className="text-center text-2xl font-semibold text-slate-800 mb-2">
                    Your ONE step:
                  </p>
                  <p className="text-center text-xl text-pink-700 font-medium leading-relaxed">
                    {overwhelmStep}
                  </p>
                  <p className="text-center text-sm text-slate-600 mt-4">
                    That's it. Just this one thing. You've got this.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="focus" className="space-y-4">
            <Card className="border-2 border-indigo-200 shadow-lg bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                  <Clock className="w-6 h-6" />
                  5-Minute Focus Sprint
                </CardTitle>
                <CardDescription className="text-base">
                  Get a specific 5-minute action to build momentum.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What do you want to make progress on?"
                  className="min-h-[120px] text-base border-2 border-indigo-100 focus:border-indigo-300 transition-colors"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
                <Button
                  onClick={handleFocusSprint}
                  disabled={loading === 'focus' || !taskText}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-6"
                >
                  {loading === 'focus' ? 'Creating your sprint...' : 'Start 5-Minute Sprint'}
                </Button>
              </CardContent>
            </Card>

            {focusAction && (
              <Card className="border-4 border-indigo-300 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-xl">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center mb-4">
                    <Badge className="text-lg px-4 py-2 bg-indigo-600">
                      <Clock className="w-5 h-5 mr-2" />
                      5 MINUTES
                    </Badge>
                  </div>
                  <p className="text-center text-xl text-indigo-700 font-medium leading-relaxed">
                    {focusAction}
                  </p>
                  <p className="text-center text-sm text-slate-600 mt-4">
                    Set a timer and focus on just this for 5 minutes.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <footer className="text-center py-6 text-sm text-slate-500">
          <p>Built with compassion for minds that work differently</p>
        </footer>
      </div>
    </div>
  );
}
