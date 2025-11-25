# Course System - Sample Content Guide

## Overview

This guide explains the sample course content that has been created for the Paideia course system.

## Sample Courses

### 1. Leadership Foundations (Complete)

**Status**: ✅ Fully populated with content  
**Difficulty**: Beginner  
**Duration**: 120 minutes  
**Modules**: 3

#### Module 1: Introduction to Leadership (15 min)

**Content**:

- What is Leadership?
- The Leadership Mindset
- Core Leadership Qualities (Integrity, Vision, Empathy, Courage, Resilience)

**Quiz**: 3 questions

- Multiple choice on primary role of leaders
- True/False on growth mindset
- Multiple choice on core qualities

#### Module 2: Building Trust and Credibility (20 min)

**Content**:

- The Foundation of Leadership: Trust
- How to Build Trust (6 actionable steps)
- Credibility Through Competence

**Quiz**: 3 questions

- True/False on trust as foundation
- Multiple choice on handling mistakes
- Multiple choice on building credibility

#### Module 3: Effective Communication (25 min)

**Content**:

- Communication as Leader's Most Important Tool
- The 3 Pillars: Clarity, Empathy, Consistency
- Active Listening techniques
- Giving Constructive Feedback

**Quiz**: 3 questions

- Multiple choice on most important communication aspect
- True/False on feedback focus
- Multiple choice on communication pillars

### 2. Systems Thinking Essentials (Placeholder)

**Status**: ⏳ Course created, modules pending  
**Difficulty**: Intermediate  
**Duration**: 90 minutes  
**Prerequisite**: Leadership Foundations

### 3. Global Citizenship (Placeholder)

**Status**: ⏳ Course created, modules pending  
**Difficulty**: Beginner  
**Duration**: 150 minutes

## Installation

### Step 1: Run Schema Migration

```bash
# In Supabase SQL Editor or via CLI
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/courses_schema.sql
```

### Step 2: Load Sample Data

```bash
# In Supabase SQL Editor or via CLI
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/sample_course_data.sql
```

Or in Supabase Dashboard:

1. Go to SQL Editor
2. Copy content from `sample_course_data.sql`
3. Click "Run"

## Content Structure

### Lesson Sections

Each lesson uses a JSON structure with different section types:

1. **Text Sections**

   ```json
   {
     "type": "text",
     "title": "Section Title",
     "content": "Main content text..."
   }
   ```

2. **Callout Sections** (Info, Tip, Warning, Success)

   ```json
   {
     "type": "callout",
     "callout_type": "tip",
     "title": "Key Insight",
     "content": "Important message..."
   }
   ```

3. **List Sections**
   ```json
   {
     "type": "list",
     "title": "List Title",
     "items": ["Item 1", "Item 2", "Item 3"]
   }
   ```

### Quiz Questions

Two types supported:

1. **Multiple Choice**

   ```sql
   question_type: 'multiple_choice'
   options: ["Option 1", "Option 2", "Option 3", "Option 4"]
   correct_answer: "Option 2"
   ```

2. **True/False**
   ```sql
   question_type: 'true_false'
   options: NULL
   correct_answer: "True" or "False"
   ```

## Adding More Content

### Adding a New Module

```sql
INSERT INTO course_modules (course_id, title, description, content, order_index, duration_minutes)
VALUES (
  'YOUR_COURSE_ID',
  'Module Title',
  'Module description',
  jsonb_build_object(
    'type', 'lesson',
    'sections', jsonb_build_array(
      jsonb_build_object(
        'type', 'text',
        'title', 'Section Title',
        'content', 'Your content here...'
      )
    )
  ),
  4, -- order_index
  30  -- duration in minutes
);
```

### Adding Quiz Questions

```sql
INSERT INTO quiz_questions (module_id, question, question_type, options, correct_answer, explanation, points, order_index)
VALUES (
  'YOUR_MODULE_ID',
  'Your question here?',
  'multiple_choice',
  jsonb_build_array('Option 1', 'Option 2', 'Option 3', 'Option 4'),
  'Option 2',
  'Explanation of why this is correct...',
  1,
  1
);
```

## Content Guidelines

### Writing Effective Lessons

1. **Start with Context**: Explain why the topic matters
2. **Use Clear Language**: Avoid jargon, write for clarity
3. **Include Examples**: Make concepts concrete
4. **Add Callouts**: Highlight key insights
5. **Use Lists**: Break down complex information
6. **End with Action**: Give learners something to do

### Writing Good Quiz Questions

1. **Test Understanding**: Not just memorization
2. **Be Specific**: Avoid ambiguous wording
3. **Provide Explanations**: Help learners learn from mistakes
4. **Vary Difficulty**: Mix easy and challenging questions
5. **Align with Content**: Only test what was taught

## Verification

After loading sample data, verify:

```sql
-- Check courses
SELECT id, title, order_index FROM courses ORDER BY order_index;

-- Check modules for Leadership course
SELECT cm.title, cm.order_index, cm.duration_minutes
FROM course_modules cm
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Leadership Foundations'
ORDER BY cm.order_index;

-- Check quiz questions
SELECT q.question, q.question_type, q.correct_answer
FROM quiz_questions q
JOIN course_modules cm ON q.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Leadership Foundations'
ORDER BY cm.order_index, q.order_index;
```

## Next Steps

1. **Test the Flow**:

   - Navigate to `/courses`
   - Click on "Leadership Foundations"
   - Complete Module 1
   - Take the quiz
   - Verify progress updates

2. **Add More Courses**:

   - Populate Systems Thinking modules
   - Add Global Citizenship content
   - Create additional courses

3. **Enhance Content**:
   - Add images to lessons
   - Embed videos
   - Create interactive exercises

## Sample Content Statistics

- **Total Courses**: 3
- **Complete Courses**: 1 (Leadership Foundations)
- **Total Modules**: 3
- **Total Quiz Questions**: 9
- **Estimated Study Time**: 60 minutes (for complete course)
- **Pass Rate**: 70% (7 out of 9 questions)

---

**Ready to Learn!** 🎓

The sample content provides a complete learning experience for the Leadership Foundations course, demonstrating all features of the course system.
