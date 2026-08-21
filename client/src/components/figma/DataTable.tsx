import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, Filter, Download, Eye, Edit, Trash2, FolderOpen } from 'lucide-react';

interface TableEntry {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  progress: number;
  type: string;
}

const tableData: TableEntry[] = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    status: "active",
    priority: "high",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-15",
    progress: 75,
    type: "Design"
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development",
    status: "active",
    priority: "high",
    assignee: "Mike Chen",
    dueDate: "2024-01-20",
    progress: 45,
    type: "Development"
  },
  {
    id: "PRJ-003",
    name: "Database Migration",
    status: "pending",
    priority: "medium",
    assignee: "Alex Rodriguez",
    dueDate: "2024-01-25",
    progress: 0,
    type: "Infrastructure"
  },
  {
    id: "PRJ-004",
    name: "User Testing",
    status: "completed",
    priority: "low",
    assignee: "Emily Davis",
    dueDate: "2024-01-10",
    progress: 100,
    type: "Testing"
  },
  {
    id: "PRJ-005",
    name: "Marketing Campaign",
    status: "active",
    priority: "medium",
    assignee: "David Wilson",
    dueDate: "2024-01-18",
    progress: 60,
    type: "Marketing"
  },
  {
    id: "PRJ-006",
    name: "Security Audit",
    status: "cancelled",
    priority: "high",
    assignee: "Lisa Thompson",
    dueDate: "2024-01-12",
    progress: 25,
    type: "Security"
  }
];

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredData = tableData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400', label: 'Active' },
      pending: { className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400', label: 'Pending' },
      completed: { className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400', label: 'Completed' },
      cancelled: { className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400', label: 'Cancelled' }
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: { className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400', label: 'High' },
      medium: { className: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400', label: 'Medium' },
      low: { className: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400', label: 'Low' }
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  return (
    <div className="space-y-6">
      <Card className="macos-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Project Entries</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Manage and track all your projects</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="macos-button h-8">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="macos-button h-8">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects, assignees, or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="macos-input pl-10 h-9 border-0 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-9 macos-input border-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="macos-card border-0">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px] h-9 macos-input border-0">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="macos-card border-0">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="macos-card border-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent">
                  <TableHead className="font-medium text-muted-foreground">Project</TableHead>
                  <TableHead className="font-medium text-muted-foreground">Status</TableHead>
                  <TableHead className="font-medium text-muted-foreground">Priority</TableHead>
                  <TableHead className="font-medium text-muted-foreground">Assignee</TableHead>
                  <TableHead className="font-medium text-muted-foreground">Due Date</TableHead>
                  <TableHead className="font-medium text-muted-foreground">Progress</TableHead>
                  <TableHead className="font-medium text-muted-foreground">Type</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="border-b border-border/30 hover:bg-accent/30">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadge(item.status).className} border font-medium`}>
                        {getStatusBadge(item.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getPriorityBadge(item.priority).className} border font-medium`}>
                        {getPriorityBadge(item.priority).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.assignee}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-muted rounded-full h-2 max-w-[80px]">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium min-w-[35px]">{item.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/50 border-border/50">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/50">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="macos-card border-0 w-40">
                          <DropdownMenuItem className="hover:bg-accent/50">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-accent/50">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {tableData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="macos-button h-8">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="macos-button h-8">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}