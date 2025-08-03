'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Download, Upload, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, UserPlus, Calendar, MessageSquare, Phone } from 'lucide-react';
import { apiService } from '@/lib/api-service';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { ImportModal } from '@/components/customers/ImportModal';
import { ExportModal } from '@/components/customers/ExportModal';
import { EditCustomerModal } from '@/components/customers/EditCustomerModal';

interface Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  customer_type: string;
  status?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  date_of_birth?: string;
  anniversary_date?: string;
  preferred_metal?: string;
  preferred_stone?: string;
  ring_size?: string;
  budget_range?: string;
  lead_source?: string;
  assigned_to?: number;
  notes?: string;
  community?: string;
  mother_tongue?: string;
  reason_for_visit?: string;
  age_of_end_user?: string;
  saving_scheme?: string;
  catchment_area?: string;
  next_follow_up?: string;
  summary_notes?: string;
  customer_interests: string[];
  tenant?: number;
  tags: number[];
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at?: string;
}

export default function CustomersPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchClients();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await apiService.getClients({
        page: currentPage,
        search: searchTerm || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });
      
      if (response.success) {
        const data = response.data as any;
        setClients(Array.isArray(data) ? data : data.results || []);
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      // Fallback to empty array if API fails
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (customerData: any) => {
    try {
      const response = await apiService.createClient(customerData);
      if (response.success) {
        setShowAddModal(false);
        fetchClients(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to create client:', error);
    }
  };

  const handleImportSuccess = () => {
    fetchClients(); // Refresh the list after import
  };

  const handleExportSuccess = () => {
    // Export doesn't need to refresh the list
  };

  const getStatusBadgeVariant = (status: string | undefined) => {
    if (!status) return 'outline';
    
    switch (status.toLowerCase()) {
      case 'customer':
        return 'default';
      case 'prospect':
        return 'secondary';
      case 'lead':
        return 'outline';
      case 'inactive':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleViewCustomer = (client: Client) => {
    // Navigate to customer detail page
    window.location.href = `/business-admin/customers/${client.id}`;
  };

  const handleEditCustomer = (client: Client) => {
    setSelectedCustomer(client);
    setShowEditModal(true);
  };

  const handleDeleteCustomer = async (client: Client) => {
    if (confirm(`Are you sure you want to delete ${client.first_name} ${client.last_name}?`)) {
      try {
        await apiService.deleteClient(client.id.toString());
        fetchClients(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete client:', error);
        alert('Failed to delete customer');
      }
    }
  };

  const handleAssignCustomer = (client: Client) => {
    console.log('Assign customer:', client);
    // TODO: Implement assign functionality
  };

  const handleScheduleAppointment = (client: Client) => {
    // Navigate to appointment scheduling
    window.location.href = `/business-admin/appointments/new?customer=${client.id}`;
  };

  const handleSendMessage = (client: Client) => {
    console.log('Send message to:', client);
    // TODO: Implement messaging functionality
  };

  const handleCallCustomer = (client: Client) => {
    if (client.phone && client.phone.trim()) {
      window.open(`tel:${client.phone}`, '_blank');
    } else {
      alert('No phone number available for this customer');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Customers</h1>
          <p className="text-text-secondary mt-1">Manage your customer relationships and interactions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setIsImportModalOpen(true)}
          >
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setIsExportModalOpen(true)}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Total Customers</p>
                <p className="text-2xl font-bold text-text-primary">{clients.length || 0}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Active Customers</p>
                <p className="text-2xl font-bold text-text-primary">
                  {clients.filter(c => c.status === 'customer').length || 0}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-semibold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">New This Month</p>
                <p className="text-2xl font-bold text-text-primary">
                  {clients.filter(c => {
                    if (!c.created_at) return false;
                    const created = new Date(c.created_at);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                  }).length || 0}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm font-semibold">📈</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Leads</p>
                <p className="text-2xl font-bold text-text-primary">
                  {clients.filter(c => c.status === 'lead').length || 0}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-sm font-semibold">🎯</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-text-secondary">Loading customers...</div>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-text-secondary mb-2">No customers found</div>
              <Button onClick={() => setShowAddModal(true)} variant="outline">
                Add your first customer
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Assigned To</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-text-primary">
                            {client.first_name || ''} {client.last_name || ''}
                          </div>
                          {client.preferred_metal && (
                            <div className="text-sm text-text-secondary">
                              Prefers: {client.preferred_metal}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-text-primary">{client.email || 'N/A'}</div>
                          <div className="text-sm text-text-secondary">{client.phone || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusBadgeVariant(client.status)}>
                          {client.status 
                            ? client.status.charAt(0).toUpperCase() + client.status.slice(1)
                            : 'Unknown'
                          }
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {client.lead_source || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {client.assigned_to 
                          ? `User ${client.assigned_to}`
                          : 'Unassigned'
                        }
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {formatDate(client.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleViewCustomer(client)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCustomer(client)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleScheduleAppointment(client)}>
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendMessage(client)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCallCustomer(client)}>
                              <Phone className="w-4 h-4 mr-2" />
                              Call Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleAssignCustomer(client)}>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Assign to Team Member
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCustomer(client)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      {showAddModal && (
        <AddCustomerModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={handleImportSuccess}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onSuccess={handleExportSuccess}
      />

      {/* Edit Customer Modal */}
      <EditCustomerModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onCustomerUpdated={() => {
          fetchClients(); // Refresh the list
          setShowEditModal(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
}