'use client';

import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2, Edit2, ChevronDown, ChevronRight, File } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  resources: any[];
}

const initialModules: Module[] = [
  { id: '1', title: 'Introduction to Journalism', description: 'Basic concepts and ethics.', resources: [1, 2] },
  { id: '2', title: 'Audio Recording & Editing', description: 'Hands-on practice with equipment.', resources: [1, 2, 3] },
  { id: '3', title: 'Community Storytelling', description: 'Finding and pitching local stories.', resources: [] },
];

function SortableModuleItem({ module }: { module: Module }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div className="flex items-center p-4 bg-gray-50 border-b border-gray-100">
        <div {...attributes} {...listeners} className="cursor-grab p-1 mr-2 text-gray-400 hover:text-gray-600">
          <GripVertical className="h-5 w-5" />
        </div>
        <div 
          className="flex-grow cursor-pointer flex items-center justify-between"
          onClick={() => setExpanded(!expanded)}
        >
          <div>
            <h3 className="font-semibold text-gray-900">{module.title}</h3>
            <p className="text-sm text-gray-500">{module.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded">
              {module.resources.length} resources
            </span>
            {expanded ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
          </div>
        </div>
        <div className="flex items-center ml-4 space-x-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 bg-white">
          {module.resources.length > 0 ? (
            <div className="space-y-2">
              {module.resources.map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-gray-50">
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Resource {i + 1}</span>
                  </div>
                  <button className="text-xs text-blue-600 font-medium hover:underline">Edit</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic py-2 text-center">No resources added yet.</p>
          )}
          <button className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[#cf5626]">
            <Plus className="h-4 w-4" /> Add Resource
          </button>
        </div>
      )}
    </div>
  );
}

export default function CourseOutlineBuilder({ params }: { params: { id: string } }) {
  const [modules, setModules] = useState(initialModules);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">Course Outline</h1>
          <p className="text-gray-600 mt-1">Drag and drop modules to reorder them.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md font-medium hover:bg-[#cf5626] transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add Module
        </button>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={modules.map(m => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-1">
            {modules.map((module) => (
              <SortableModuleItem key={module.id} module={module} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
