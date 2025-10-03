"use client";
import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { API_URL } from "@/config/api";
import axios from "@/lib/api";

interface EventEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    location: string;
    time: string;
    date: string;
    image?: File;
    is_portfolio: boolean;
    content: string;
  }) => void;
  initialData?: {
    title: string;
    description: string;
    location: string;
    time: string;
    date: string;
    image?: string;
    isPortfolio: boolean;
    content: string;
  };
}

// Interface for tracking validation errors
interface ValidationErrors {
  title: string;
  description: string;
  location: string;
  time: string;
  date: string;
  image: string;
  content: string;
}

const EventEditorModal: React.FC<EventEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPortfolio, setIsPortfolio] = useState(false);
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  
  // Validation states
  const [errors, setErrors] = useState<ValidationErrors>({
    title: '',
    description: '',
    location: '',
    time: '',
    date: '',
    image: '',
    content: ''
  });
  const [attempted, setAttempted] = useState(false);
  
  // Reset validation state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({
        title: '',
        description: '',
        location: '',
        time: '',
        date: '',
        image: '',
        content: ''
      });
      setAttempted(false);
    }
  }, [isOpen]);

  // Reset fields when modal closes, unless initialData is provided
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        if (!initialData) {
          setTitle("");
          setDescription("");
          setLocation("");
          setTime("");
          setDate("");
          setImage(null);
          setImagePreview(null);
          setIsPortfolio(false);
          setContent("");
          setIsExpanded(false);
          setShowPreview(false);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialData]);

  // Load initial data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || "");
        setDescription(initialData.description || "");
        setLocation(initialData.location || "");
        setTime(initialData.time || "");
        setDate(initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : "");
        setImagePreview(initialData.image || null);
        setIsPortfolio(initialData.isPortfolio || false);
        setContent(initialData.content || "");
      } else {
        setTitle("");
        setDescription("");
        setLocation("");
        setTime("");
        setDate("");
        setImage(null);
        setImagePreview(null);
        setIsPortfolio(false);
        setContent("");
      }
    }
  }, [isOpen, initialData]);

  // Run validation whenever input fields change (if user has attempted submission)
  useEffect(() => {
    if (attempted) {
      validateForm();
    }
  }, [title, description, location, time, date, image, content, attempted]);

  // Validation function
  const validateForm = () => {
    const newErrors: ValidationErrors = {
      title: '',
      description: '',
      location: '',
      time: '',
      date: '',
      image: '',
      content: ''
    };

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!time.trim()) newErrors.time = 'Time is required';
    if (!date.trim()) newErrors.date = 'Date is required';
    if (!image && !imagePreview) newErrors.image = 'Image is required';
    const contentWithoutTags = content.replace(/<[^>]*>/g, '').trim();
    if (!contentWithoutTags) newErrors.content = 'Content is required';

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  // Toggle editor size
  const toggleEditorSize = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle content preview
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Handle save button click
  const handleSave = () => {
    setAttempted(true);
    const isValid = validateForm();
    if (isValid) {
      onSave({
        title,
        description,
        location,
        time,
        date,
        image: image || undefined,
        is_portfolio: isPortfolio,
        content,
      });
      onClose();
    } else {
      const firstErrorField = Object.keys(errors).find(key => errors[key as keyof ValidationErrors] !== '');
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
    }
  };

  // Error message component
  const ErrorMessage = ({ message }: { message: string }) => {
    if (!message) return null;
    return <p className="text-red-500 text-xs mt-1">{message}</p>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Event" : "Add Event"} width="max-w-6xl">
      <div className="max-h-[85vh] overflow-y-auto pr-2">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-black dark:text-white">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full rounded-lg border-[1.5px] ${errors.title ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              placeholder="Enter event title"
            />
            <ErrorMessage message={errors.title} />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`w-full rounded-lg border-[1.5px] ${errors.description ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              placeholder="Enter event description"
            />
            <ErrorMessage message={errors.description} />
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-black dark:text-white">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full rounded-lg border-[1.5px] ${errors.location ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              placeholder="Enter event location"
            />
            <ErrorMessage message={errors.location} />
          </div>
          
          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-black dark:text-white">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full rounded-lg border-[1.5px] ${errors.time ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <ErrorMessage message={errors.time} />
          </div>
          
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-black dark:text-white">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full rounded-lg border-[1.5px] ${errors.date ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <ErrorMessage message={errors.date} />
          </div>
          
          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-black dark:text-white">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full cursor-pointer rounded-lg border-[1.5px] ${errors.image ? 'border-red-500' : 'border-stroke'} bg-transparent outline-none transition file:mr-5 file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary dark:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Event Image Preview"
                  className="max-w-full max-h-[200px] rounded-lg"
                />
              </div>
            )}
            <ErrorMessage message={errors.image} />
          </div>
          
          {/* Is Portfolio Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_portfolio"
              checked={isPortfolio}
              onChange={(e) => setIsPortfolio(e.target.checked)}
              className="mr-2 h-5 w-5 cursor-pointer accent-primary"
            />
            <label htmlFor="is_portfolio" className="text-sm font-medium text-black dark:text-white cursor-pointer">
              Is Portfolio Event
            </label>
          </div>
          
          {/* Content Editor */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block text-sm font-medium text-black dark:text-white">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={togglePreview}
                  className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
                <button
                  type="button"
                  onClick={toggleEditorSize}
                  className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {isExpanded ? "Collapse Editor" : "Expand Editor"}
                </button>
              </div>
            </div>
            
            <div 
              id="content"
              ref={editorContainerRef}
              className={`transition-all duration-300 ease-in-out relative ${errors.content ? 'border-[1.5px] border-red-500 rounded-lg' : ''}`}
            >
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (e.target.value.trim() && errors.content) {
                    setErrors(prev => ({ ...prev, content: '' }));
                  }
                }}
                rows={isExpanded ? 20 : 10}
                className={`w-full rounded-lg border-[1.5px] ${errors.content ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary font-mono`}
                placeholder="Enter HTML content here..."
              />
            </div>
            
            <ErrorMessage message={errors.content} />
            
            {showPreview && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Content Preview
                  </label>
                </div>
                <div className="border-revert prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: content }} className="event-content" />
                </div>
              </div>
            )}
          </div>
          
          {attempted && Object.values(errors).some(error => error !== '') && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">Please fix the highlighted errors before saving.</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800">
        <button
          onClick={onClose}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-opacity-90"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
        >
          Save Event
        </button>
      </div>
    </Modal>
  );
};

export default EventEditorModal;