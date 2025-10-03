


"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Bookmark,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  ShowBlocks,
  SimpleUploadAdapter,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import '@/css/ckeditor-styles.css';
import Modal from "./Modal";
import { API_URL } from "@/config/api";
import axios from "@/lib/api";

const LICENSE_KEY = 'GPL';

interface CKEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; content: string; excerpt: string; image?: File; thumbnail?: File; featured?: boolean }) => void;
  initialData?: { title: string; content: string; excerpt: string; image?: string; thumbnail?: string; featured?: boolean };
  customConfig?: Record<string, any>;
}

// Interface for tracking validation errors
interface ValidationErrors {
  title: string;
  excerpt: string;
  image: string;
  thumbnail: string;
  content: string;
}

const EXCERPT_MAX_LENGTH = 255;

const CKEditorModal: React.FC<CKEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  customConfig = {},
}) => {
  const editorRef = useRef<any>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorWordCountRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rawHtml, setRawHtml] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [featured, setFeatured] = useState<boolean>(false);
  const [editorHeight, setEditorHeight] = useState<string>("400px");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  
  // Add validation states
  const [errors, setErrors] = useState<ValidationErrors>({
    title: '',
    excerpt: '',
    image: '',
    thumbnail: '',
    content: ''
  });
  const [attempted, setAttempted] = useState(false);
  
  // Reset validation state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({
        title: '',
        excerpt: '',
        image: '',
        thumbnail: '',
        content: ''
      });
      setAttempted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        if (!initialData) {
          setTitle("");
          setContent("");
          setRawHtml("");
          setExcerpt("");
          setImage(null);
          setImagePreview(null);
          setThumbnail(null);
          setThumbnailPreview(null);
          setFeatured(false);
          setIsExpanded(false);
          setEditorHeight("400px");
          setShowPreview(false);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || "");
        setContent(initialData.content || "");
        setRawHtml(initialData.content || "");
        setExcerpt(initialData.excerpt || "");
        setImagePreview(initialData.image || null);
        setThumbnailPreview(initialData.thumbnail || null);
        setFeatured(initialData.featured || false);
      } else {
        setTitle("");
        setContent("");
        setRawHtml("");
        setExcerpt("");
        setImage(null);
        setImagePreview(null);
        setThumbnail(null);
        setThumbnailPreview(null);
        setFeatured(false);
      }
    }
  }, [isOpen, initialData]);

  // Run validation whenever input fields change (if user has attempted submission)
  useEffect(() => {
    if (attempted) {
      validateForm();
    }
  }, [title, excerpt, image, thumbnail, rawHtml, attempted]);

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= EXCERPT_MAX_LENGTH) {
      setExcerpt(value);
      // Clear error if within limit
      if (errors.excerpt && value.trim()) {
        setErrors(prev => ({ ...prev, excerpt: '' }));
      }
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors: ValidationErrors = {
      title: '',
      excerpt: '',
      image: '',
      thumbnail: '',
      content: ''
    };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (excerpt.length > EXCERPT_MAX_LENGTH) {
      newErrors.excerpt = `Excerpt must not exceed ${EXCERPT_MAX_LENGTH} characters`;
    }

    // Check for image - consider both new uploads and existing images
    if (!image && !imagePreview) {
      newErrors.image = 'Featured image is required';
    }

    // Check for thumbnail - consider both new uploads and existing images
    if (!thumbnail && !thumbnailPreview) {
      newErrors.thumbnail = 'Thumbnail image is required';
    }

    // Check if content is empty or just contains empty HTML tags
    const contentWithoutTags = rawHtml.replace(/<[^>]*>/g, '').trim();
    if (!contentWithoutTags) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    
    // Return true if no errors
    return !Object.values(newErrors).some(error => error !== '');
  };

  class ServerUploadAdapter {
    private loader;
    private apiUrl;
  
    constructor(loader:any) {
      this.loader = loader;
      this.apiUrl = `${API_URL}/blog/upload-image`;
    }
  
    async upload() {
      try {
        const file = await this.loader.file;
        const formData = new FormData();
        formData.append('upload', file);
  
        // Send the image to the server using axios
        const response = await axios.post(this.apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, 
        });
  
        // Axios automatically parses JSON
        const data = response.data;
        if (!data.data[0].uploaded) {
          throw new Error(data.error?.message || 'Upload failed');
        }
        const imageUrl = data.data[0].url;

        return {
          default: imageUrl,
        };
      } catch (error) {
        console.error('Image upload error:', error);
        throw error;
      }
    }
  
    abort() {
      // Abort upload if needed
    }
  }
  
  function CustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new ServerUploadAdapter(loader);
    };
  }

  const editorConfig = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      plugins: [
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        BlockToolbar,
        Bold,
        Bookmark,
        Code,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageEditing,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        ImageUtils,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Paragraph,
        PasteFromMarkdownExperimental,
        PasteFromOffice,
        RemoveFormat,
        ShowBlocks,
        SimpleUploadAdapter,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        Title,
        TodoList,
        Underline,
        WordCount
      ],
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'showBlocks',
          '|',
          'heading',
          'style',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'insertImage',
          'insertTable',
          'highlight',
          'blockQuote',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent'
        ],
        shouldNotGroupWhenFull: true
      },
      balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
      blockToolbar: [
        'undo',
        'redo',
        '|',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'insertImage',
        'insertTable',
        '|',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent'
      ],
      fontFamily: { supportAllValues: true },
      fontSize: { options: [10, 12, 14, 'default', 18, 20, 22], supportAllValues: true },
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
      },
      htmlSupport: {
        allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }]
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage'
        ]
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: { download: 'file' }
          }
        }
      },
      list: { properties: { styles: true, startIndex: true, reversed: true } },
      placeholder: "Type your blog content here...",
      style: {
        definitions: [
          { name: 'Article category', element: 'h3', classes: ['category'] },
          { name: 'Title', element: 'h2', classes: ['document-title'] },
          { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
          { name: 'Info box', element: 'p', classes: ['info-box'] },
          { name: 'Side quote', element: 'blockquote', classes: ['side-quote'] },
          { name: 'Marker', element: 'span', classes: ['marker'] },
          { name: 'Spoiler', element: 'span', classes: ['spoiler'] },
          { name: 'Code (dark)', element: 'pre', classes: ['fancy-code', 'fancy-code-dark'] },
          { name: 'Code (bright)', element: 'pre', classes: ['fancy-code', 'fancy-code-bright'] }
        ]
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
      },
      extraPlugins: [CustomUploadAdapterPlugin],
      licenseKey: LICENSE_KEY,
      ...customConfig
    };
  }, [isLayoutReady, customConfig]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      // Clear error when a valid image is uploaded
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
      // Clear error when a valid thumbnail is uploaded
      if (errors.thumbnail) {
        setErrors(prev => ({ ...prev, thumbnail: '' }));
      }
    }
  };

  const toggleEditorSize = () => {
    setIsExpanded(!isExpanded);
    setEditorHeight(isExpanded ? "400px" : "650px");
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleSave = async () => {
    // Mark that submission was attempted
    setAttempted(true);
    
    // Validate form
    const isValid = validateForm();
    
    // Only proceed if form is valid
    if (isValid) {
      const blogData = {
        title,
        content: rawHtml,
        excerpt,
        featured,
        image: image || undefined,
        thumbnail: thumbnail || undefined
      };
      onSave(blogData);
      onClose();
    } else {
      // Scroll to first error
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

  const handleClose = () => {
    // Maybe add confirmation if there are unsaved changes
    onClose();
  };
  
  // Error message component for consistent error styling
  const ErrorMessage = ({ message }: { message: string }) => {
    if (!message) return null;
    return (
      <p className="text-red-500 text-xs mt-1">{message}</p>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Blog Editor" width="max-w-6xl">
      <div className="max-h-[85vh] overflow-y-auto pr-2">
        <div className="space-y-4">
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
              placeholder="Enter blog title"
            />
            <ErrorMessage message={errors.title} />
          </div>
          
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-black dark:text-white">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={handleExcerptChange}
              rows={3}
              maxLength={EXCERPT_MAX_LENGTH} // Enforce max length in HTML
              className={`w-full rounded-lg border-[1.5px] ${
                errors.excerpt ? 'border-red-500' : 'border-stroke'
              } bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              placeholder="Enter blog excerpt (max 255 characters)"
            />
            <div className="flex justify-between text-xs mt-1">
              <ErrorMessage message={errors.excerpt} />
              <span className={`${excerpt.length > EXCERPT_MAX_LENGTH ? 'text-red-500' : 'text-gray-500'} text-right`}>
                {excerpt.length}/{EXCERPT_MAX_LENGTH}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-black dark:text-white">
                Featured Image <span className="text-red-500">*</span>
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
                    alt="Featured Image Preview"
                    className="max-w-full max-h-[200px] rounded-lg"
                  />
                </div>
              )}
              <ErrorMessage message={errors.image} />
            </div>
            
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-black dark:text-white">
                Thumbnail Image <span className="text-red-500">*</span>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className={`w-full cursor-pointer rounded-lg border-[1.5px] ${errors.thumbnail ? 'border-red-500' : 'border-stroke'} bg-transparent outline-none transition file:mr-5 file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary dark:border-form-strokedark dark:file:bg-white/30 dark:file:text-white`}
              />
              {thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="max-w-full max-h-[200px] rounded-lg"
                  />
                </div>
              )}
              <ErrorMessage message={errors.thumbnail} />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="mr-2 h-5 w-5 cursor-pointer accent-primary"
            />
            <label htmlFor="featured" className="text-sm font-medium text-black dark:text-white cursor-pointer">
              Featured Blog Post
            </label>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block text-sm font-medium text-black dark:text-white">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                  Press Ctrl+Z to undo, Ctrl+Y to redo
                </div>
                {/* <button
                  type="button"
                  onClick={togglePreview}
                  className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button> */}
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
              style={{ height: editorHeight }} 
              className={`transition-all duration-300 ease-in-out relative ${errors.content ? 'border-[1.5px] border-red-500 rounded-lg' : ''}`}
            >
              {isLayoutReady && editorConfig && Object.keys(editorConfig).length > 0 && (
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  data={content}
                  onReady={(editor) => {
                    editorRef.current = editor;
                    const editorElement = editor.ui.view.editable.element;
                    if (editorElement) {
                      editorElement.style.minHeight = "200px";
                    }
                    try {
                      const wordCount = editor.plugins.get('WordCount');
                      if (wordCount && editorWordCountRef.current) {
                        editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                      }
                    } catch (e) {
                      console.warn("WordCount plugin not available:", e);
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    setRawHtml(data);
                    
                    // Clear content error if content is provided
                    if (data.trim() && errors.content) {
                      setErrors(prev => ({ ...prev, content: '' }));
                    }
                  }}
                  onError={(error, { phase }) => {
                    console.error(`CKEditor error (${phase}):`, error);
                  }}
                />
              )}
            </div>
            
            <div className="editor_container__word-count mt-1 text-right text-xs text-gray-500" ref={editorWordCountRef}></div>
            <ErrorMessage message={errors.content} />
            
            {showPreview && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Content Preview
                  </label>
                </div>
                <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 min-h-[100px] max-h-[200px] overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: rawHtml }} className="blog-content" />
                </div>
              </div>
            )}
          </div>
          
          {/* Display general form error if there are any validation issues */}
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
          onClick={handleClose}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-opacity-90"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
        >
          Save Blog Post
        </button>
      </div>
    </Modal>
  );
};

export default CKEditorModal;