import React, { useState } from 'react';
import { X, Save, Sparkles, Pencil } from 'lucide-react';
import { PageRecord, PageSectionId } from '../../types';

interface InlineSectionModalProps {
  page: PageRecord;
  sectionId: PageSectionId;
  sectionTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSavePage: (updatedPage: PageRecord) => void;
}

export const InlineSectionModal: React.FC<InlineSectionModalProps> = ({
  page,
  sectionId,
  sectionTitle,
  isOpen,
  onClose,
  onSavePage,
}) => {
  if (!isOpen) return null;

  const currentCustomContent = page.custom_content?.[sectionId] || '';
  const [content, setContent] = useState(currentCustomContent);
  const [pageTitle, setPageTitle] = useState(page.title);
  const [metaDescription, setMetaDescription] = useState(page.meta_description || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPage: PageRecord = {
      ...page,
      title: pageTitle,
      meta_description: metaDescription,
      custom_content: {
        ...(page.custom_content || {}),
        [sectionId]: content,
      },
      updated_at: new Date().toISOString(),
    };
    onSavePage(updatedPage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-base text-white">
              Inline Edit: {sectionTitle} Section
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Page Main Title (H1)
            </label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Section Custom Notes / Content Injection
            </label>
            <textarea
              rows={4}
              placeholder={`Add custom highlights or special promotion text for the ${sectionTitle} section...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
