import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";

const ContactsTable = ({ contacts, onContactUpdate, onContactDelete }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === contacts.length 
        ? [] 
        : contacts.map(contact => contact.Id)
    );
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact.Id);
    setEditForm(contact);
  };

  const handleSaveEdit = () => {
    onContactUpdate(editForm);
    setEditingContact(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setEditForm({});
  };

  return (
    <div className="bg-surface border border-secondary rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedContacts.length === contacts.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary bg-surface border-secondary rounded focus:ring-primary"
              />
              <span className="ml-2 text-sm text-slate-400">
                {selectedContacts.length} of {contacts.length} selected
              </span>
            </div>
            {selectedContacts.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ApperIcon name="Tag" size={16} className="mr-2" />
                  Tag Selected
                </Button>
                <Button variant="outline" size="sm">
                  <ApperIcon name="UserPlus" size={16} className="mr-2" />
                  Assign Rep
                </Button>
              </div>
            )}
          </div>
          <Button variant="primary" size="sm">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Contact
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedContacts.length === contacts.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary bg-surface border-secondary rounded focus:ring-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Assigned Rep
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/30">
            <AnimatePresence>
              {contacts.map((contact) => (
                <motion.tr
                  key={contact.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.Id)}
                      onChange={() => handleSelectContact(contact.Id)}
                      className="w-4 h-4 text-primary bg-surface border-secondary rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {contact.name}
                        </div>
                        <div className="text-sm text-slate-400">
                          {contact.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{contact.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={contact.status} type="contact" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{contact.assignedRep}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-400">
                      {format(new Date(contact.lastActivity), "MMM dd, yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditContact(contact)}
                      >
                        <ApperIcon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onContactDelete(contact.Id)}
                      >
                        <ApperIcon name="Trash2" size={16} className="text-error" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;