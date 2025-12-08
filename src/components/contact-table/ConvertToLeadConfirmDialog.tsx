import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Contact {
  id: string;
  contact_name: string;
  company_name?: string;
  position?: string;
  email?: string;
  phone_no?: string;
  contact_owner?: string;
  contact_source?: string;
  linkedin?: string;
  website?: string;
  industry?: string;
  region?: string;
  description?: string;
  [key: string]: any;
}

interface LeadFormData {
  lead_name: string;
  company_name: string;
  position: string;
  email: string;
  phone_no: string;
  linkedin: string;
  website: string;
  contact_source: string;
  lead_status: string;
  industry: string;
  country: string;
  description: string;
}

interface ConvertToLeadConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onConfirm: (formData: LeadFormData) => void;
  isLoading?: boolean;
}

const leadSources = [
  "Website",
  "Referral",
  "LinkedIn",
  "Cold Call",
  "Trade Show",
  "Email Campaign",
  "Social Media",
  "Partner",
  "Other",
];

const leadStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Converted",
  "Lost",
];

export const ConvertToLeadConfirmDialog = ({
  open,
  onOpenChange,
  contact,
  onConfirm,
  isLoading = false,
}: ConvertToLeadConfirmDialogProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    lead_name: "",
    company_name: "",
    position: "",
    email: "",
    phone_no: "",
    linkedin: "",
    website: "",
    contact_source: "",
    lead_status: "New",
    industry: "",
    country: "",
    description: "",
  });

  useEffect(() => {
    if (contact && open) {
      setFormData({
        lead_name: contact.contact_name || "",
        company_name: contact.company_name || "",
        position: contact.position || "",
        email: contact.email || "",
        phone_no: contact.phone_no || "",
        linkedin: contact.linkedin || "",
        website: contact.website || "",
        contact_source: contact.contact_source || "",
        lead_status: "New",
        industry: contact.industry || "",
        country: contact.region || "",
        description: contact.description || "",
      });
    }
  }, [contact, open]);

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onConfirm(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Convert Contact to Lead</DialogTitle>
          <DialogDescription>
            Review and edit the lead information before converting.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lead_name">Lead Name *</Label>
              <Input
                id="lead_name"
                value={formData.lead_name}
                onChange={(e) => handleChange("lead_name", e.target.value)}
                placeholder="Enter lead name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleChange("company_name", e.target.value)}
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                placeholder="Enter position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone_no">Phone</Label>
              <Input
                id="phone_no"
                value={formData.phone_no}
                onChange={(e) => handleChange("phone_no", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="Enter LinkedIn URL"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="Enter website URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                placeholder="Enter industry"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_source">Lead Source</Label>
              <Select
                value={formData.contact_source}
                onValueChange={(value) => handleChange("contact_source", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lead source" />
                </SelectTrigger>
                <SelectContent>
                  {leadSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead_status">Lead Status</Label>
              <Select
                value={formData.lead_status}
                onValueChange={(value) => handleChange("lead_status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lead status" />
                </SelectTrigger>
                <SelectContent>
                  {leadStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country/Region</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="Enter country or region"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.lead_name.trim()}
          >
            {isLoading ? "Converting..." : "Convert to Lead"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
