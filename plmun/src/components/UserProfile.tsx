'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
interface Audition {
  id: number;
  role: string;
  created_at: string;
  status?: string;
}

const ApplicationDashboard = () => {
  const { username, contactNumber, email } = useAuth();
  const [auditions, setAuditions] = useState<Audition[]>([]);

  // Add state for form fields
  const [formData, setFormData] = useState({
    year: '',
    course: '',
    phone: '',
    gender: '',
    role: '',
    why: ''
  });

  // Function to fetch auditions
  const fetchAuditions = async () => {
    try {
      const response = await axios.get('/api/useraudition');
      if (response.status === 200) {
        setAuditions(response.data.auditions);
      }
    } catch (error) {
      console.error('Error fetching auditions:', error);
    }
  };

  // Fetch auditions on component mount
  useEffect(() => {
    fetchAuditions();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/audition', formData);
      
      if (response.status === 200) {
        alert(response.data.success);
        
        // Reset form
        setFormData({
          year: '',
          course: '',
          phone: '',
          gender: '',
          role: '',
          why: ''
        });

        // Fetch updated auditions immediately
        await fetchAuditions();
        
        // Switch to the applications tab
        const applicationTrigger = document.querySelector('[value="application"]') as HTMLElement;
        if (applicationTrigger) {
          applicationTrigger.click();
        }
      }
    } catch (error: any) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  // Handle select changes
  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to generate audition number
  const generateAuditionNumber = (date: string, id: number) => {
    const createdDate = new Date(date);
    const month = createdDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const number = id.toString().padStart(6, '0');
    return `${month}${number}`;
  };

  // Function to format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Add withdraw function
  const handleWithdraw = async (auditionId: number) => {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      const response = await axios.post('/api/withdraw', { auditionId });
      
      if (response.status === 200) {
        alert(response.data.success);
        // Fetch updated auditions immediately
        await fetchAuditions();
      }
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to withdraw application');
    }
  };

  return (
    <div className="w-full mx-auto px-36 pb-16 min-h-screen mt-42">
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 bg-gray-300">
            {/* Profile image would go here */}
          </Avatar>
          <div>
            <h2 className="text-lg font-medium">{username || 'Your Name Here'}</h2>
            <p className="text-sm text-gray-500">Contact Number: {contactNumber || 'Your Contact Number Here'}</p>
            <p className="text-sm text-gray-500">Email Address: {email || 'Your Email Address Here'}</p>
          </div>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">Edit Profile</Button>
      </div>

      {/* Application Tabs */}
      <Tabs defaultValue="application" className="w-full">
        <div className="flex justify-between items-center border-b border-indigo-600">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger 
              value="application"
              className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none bg-transparent data-[state=active]:shadow-none"
            >
              Your Application
            </TabsTrigger>
            <TabsTrigger 
              value="audition"
              className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none bg-transparent data-[state=active]:shadow-none ml-auto"
            >
              Audition Form
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Application Tab Content */}
        <TabsContent value="application">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Audition Number</TableHead>
                    <TableHead>Your Application Status</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditions.length > 0 ? (
                    auditions.map((audition) => (
                      <TableRow key={audition.id}>
                        <TableCell className="font-medium">{audition.role}</TableCell>
                        <TableCell>{generateAuditionNumber(audition.created_at, audition.id)}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded text-amber-600 font-medium">
                            {audition.status || 'Pending'}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(audition.created_at)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleWithdraw(audition.id)}
                              >
                                Withdraw Application
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No auditions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audition Form Tab Content */}
        <TabsContent value="audition">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 pt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold">PLMun Chorale Audition Form</h2>
                  <p className="text-sm text-gray-500">Please fill all the necessary fields</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number" 
                      required 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Year Level <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'year')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="First Year">First Year</SelectItem>
                        <SelectItem value="Second Year">Second Year</SelectItem>
                        <SelectItem value="Third Year">Third Year</SelectItem>
                        <SelectItem value="Fourth Year">Fourth Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      College Course <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'course')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select college course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BS Computer Science">BS Computer Science</SelectItem>
                        <SelectItem value="BS Information Technology">BS Information Technology</SelectItem>
                        <SelectItem value="BS Electronics Engineering">BS Electronics Engineering</SelectItem>
                        <SelectItem value="BS Mechanical Engineering">BS Mechanical Engineering</SelectItem>
                        <SelectItem value="BS Civil Engineering">BS Civil Engineering</SelectItem>
                        <SelectItem value="BS Business Administration">BS Business Administration</SelectItem>
                        <SelectItem value="BS Accountancy">BS Accountancy</SelectItem>
                        <SelectItem value="BS Education">BS Education</SelectItem>
                        <SelectItem value="BS Nursing">BS Nursing</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'gender')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer Not to Say">Prefer Not to Say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'role')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Soprano">Soprano</SelectItem>
                        <SelectItem value="Alto">Alto</SelectItem>
                        <SelectItem value="Tenor">Tenor</SelectItem>
                        <SelectItem value="Bass">Bass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Why do you want to join PLMun Chorale? <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      name="why"
                      value={formData.why}
                      onChange={handleInputChange}
                      rows={4} 
                      required 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 mb-6">
                    Submit
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationDashboard;