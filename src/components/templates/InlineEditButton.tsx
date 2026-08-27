import React from 'react';
import { Pencil } from 'lucide-react';
import { PageSectionId } from '../../types';

interface InlineEditButtonProps {
  sectionId: PageSectionId;
  sectionTitle: string;
  isAdmin: boolean;
  onEditSection: (sectionId: PageSectionId, sectionTitle: string) => void;
}

export const InlineEditButton: React.FC<InlineEditButtonProps> = ({
  sectionId,
  sectionTitle,
  isAdmin,
  onEditSection,
}) => {
  if (!isAdmin) return null;

  return (
    <div className="relative group">
      <button
        type="button"
        id={`inline-edit-btn-${sectionId}`}
        onClick={(e) => {
          e.stopPropagation();
          onEditSection(sectionId, sectionTitle);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all cursor-pointer ring-2 ring-white"
        title={`Edit ${sectionTitle} Section Content in CMS`}
      >
        <Pencil className="w-3.5 h-3.5" />
        <span>Edit Section</span>
      </button>
    </div>
  );
};
