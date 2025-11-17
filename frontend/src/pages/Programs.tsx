import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, ExternalLink, Calendar, MapPin, Award } from 'lucide-react';

const programs = [
  {
    id: 1,
    name: 'YALI Regional Leadership Center',
    type: 'Fellowship',
    deadline: '2024-03-15',
    region: 'Africa',
    description: 'Leadership training program for young African leaders in business, civic engagement, and public management.',
    eligibility: ['Age 18-35', 'African citizen', 'English proficiency'],
    matchScore: 95,
  },
  {
    id: 2,
    name: 'Chevening Scholarship',
    type: 'Scholarship',
    deadline: '2024-11-01',
    region: 'United Kingdom',
    description: 'UK government global scholarship programme for future leaders to pursue one-year master\'s degree.',
    eligibility: ['Bachelor degree', 'Work experience', 'Return to home country'],
    matchScore: 88,
  },
  {
    id: 3,
    name: 'Tony Elumelu Foundation',
    type: 'Accelerator',
    deadline: '2024-02-28',
    region: 'Africa',
    description: 'Entrepreneurship program providing training, funding, and mentoring to African entrepreneurs.',
    eligibility: ['African entrepreneur', 'Early-stage business', 'Scalable idea'],
    matchScore: 82,
  },
  {
    id: 4,
    name: 'Mandela Washington Fellowship',
    type: 'Fellowship',
    deadline: '2024-10-15',
    region: 'United States',
    description: 'Leadership training in business, civic leadership, or public management for young African leaders.',
    eligibility: ['Age 25-35', 'Sub-Saharan African', 'Leadership experience'],
    matchScore: 90,
  },
  {
    id: 5,
    name: 'Rhodes Scholarship',
    type: 'Scholarship',
    deadline: '2024-09-30',
    region: 'United Kingdom',
    description: 'Oldest international scholarship programme for postgraduate study at the University of Oxford.',
    eligibility: ['Outstanding academic achievement', 'Leadership potential', 'Commitment to service'],
    matchScore: 75,
  },
];

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || program.type === typeFilter;
    const matchesRegion = regionFilter === 'all' || program.region === regionFilter;
    return matchesSearch && matchesType && matchesRegion;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Program Intelligence Library</h1>
          <p className="text-muted-foreground mt-2">
            Discover fellowships, scholarships, and accelerators aligned with your goals
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Program Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Fellowship">Fellowship</SelectItem>
                  <SelectItem value="Scholarship">Scholarship</SelectItem>
                  <SelectItem value="Accelerator">Accelerator</SelectItem>
                </SelectContent>
              </Select>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Programs List */}
        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{program.name}</CardTitle>
                      <Badge variant="secondary">{program.type}</Badge>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        {program.matchScore}% Match
                      </Badge>
                    </div>
                    <CardDescription>{program.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {new Date(program.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{program.region}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Eligibility Requirements:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {program.eligibility.map((req, idx) => (
                      <Badge key={idx} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Official Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
