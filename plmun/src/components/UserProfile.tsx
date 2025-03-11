import React from 'react';
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

const ApplicationDashboard = () => {
  return (
    <div className="w-full mx-auto px-36 pb-16 min-h-screen mt-42">
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 bg-gray-300">
            {/* Profile image would go here */}
          </Avatar>
          <div>
            <h2 className="text-lg font-medium">Your Name Here</h2>
            <p className="text-sm text-gray-500">Contact Number Here</p>
            <p className="text-sm text-gray-500">Email Address Here</p>
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
                  <TableRow>
                    <TableCell className="font-medium">Soprano</TableCell>
                    <TableCell>JAN000001</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-amber-600 font-medium">Pending</span>
                    </TableCell>
                    <TableCell>March 11, 2025</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            Withdraw Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
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
                
                <form className="space-y-4">
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
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Year</SelectItem>
                        <SelectItem value="2">Second Year</SelectItem>
                        <SelectItem value="3">Third Year</SelectItem>
                        <SelectItem value="4">Fourth Year</SelectItem>
                        <SelectItem value="5">Fifth Year</SelectItem>
                        <SelectItem value="g">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      College Course <span className="text-red-500">*</span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select college course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bscs">BS Computer Science</SelectItem>
                        <SelectItem value="bsit">BS Information Technology</SelectItem>
                        <SelectItem value="bsece">BS Electronics Engineering</SelectItem>
                        <SelectItem value="bsme">BS Mechanical Engineering</SelectItem>
                        <SelectItem value="bsce">BS Civil Engineering</SelectItem>
                        <SelectItem value="bsba">BS Business Administration</SelectItem>
                        <SelectItem value="bsa">BS Accountancy</SelectItem>
                        <SelectItem value="bsed">BS Education</SelectItem>
                        <SelectItem value="bsn">BS Nursing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer_not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soprano">Soprano</SelectItem>
                        <SelectItem value="alto">Alto</SelectItem>
                        <SelectItem value="tenor">Tenor</SelectItem>
                        <SelectItem value="bass">Bass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Why do you want to join PLMun Chorale? <span className="text-red-500">*</span>
                    </label>
                    <textarea 
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