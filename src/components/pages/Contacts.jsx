import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ContactsTable from "@/components/organisms/ContactsTable";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { contactsService } from "@/services/api/contactsService";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactsService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleContactUpdate = async (updatedContact) => {
    try {
      await contactsService.update(updatedContact.Id, updatedContact);
      setContacts(prev => 
        prev.map(contact => 
          contact.Id === updatedContact.Id ? updatedContact : contact
        )
      );
      toast.success("Contact updated successfully");
    } catch (err) {
      toast.error("Failed to update contact");
    }
  };

  const handleContactDelete = async (contactId) => {
    try {
      await contactsService.delete(contactId);
      setContacts(prev => prev.filter(contact => contact.Id !== contactId));
      toast.success("Contact deleted successfully");
    } catch (err) {
      toast.error("Failed to delete contact");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterContacts(term, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterContacts(searchTerm, status);
  };

  const filterContacts = (search, status) => {
    let filtered = contacts;

    if (search) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      filtered = filtered.filter(contact => contact.status === status);
    }

    setFilteredContacts(filtered);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    filterContacts(searchTerm, statusFilter);
  }, [contacts, searchTerm, statusFilter]);

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadContacts} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contacts</h1>
          <p className="text-slate-400">Manage your sales leads and contacts</p>
        </div>
        <Button variant="primary">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search contacts by name, email, or company..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-3 py-2 border border-secondary rounded-lg bg-surface text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Unqualified">Unqualified</option>
            <option value="Working">Working</option>
          </select>
          <Button variant="outline">
            <ApperIcon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-secondary rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-400">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ApperIcon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <ApperIcon name="Upload" size={16} className="mr-2" />
              Import
            </Button>
          </div>
        </div>

        {filteredContacts.length === 0 ? (
          <Empty
            title="No contacts found"
            description="Try adjusting your search or filter criteria"
            icon="Users"
            actionLabel="Add First Contact"
            onAction={() => toast.info("Add contact feature coming soon!")}
          />
        ) : (
          <ContactsTable
            contacts={filteredContacts}
            onContactUpdate={handleContactUpdate}
            onContactDelete={handleContactDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Contacts;