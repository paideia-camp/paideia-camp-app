# Mindset Courses - Full System Implementation

## Overview

Comprehensive course system with interactive lessons, quizzes, progress tracking, and certificates.

## Database Schema

### Tables Created

1. **courses** - Course catalog
2. **course_modules** - Lessons and content
3. **quiz_questions** - Quiz questions for each module
4. **user_course_progress** - User's course completion tracking
5. **user_module_progress** - Module-level progress
6. **user_quiz_attempts** - Quiz attempt history
7. **course_certificates** - Generated certificates

### Key Features

- Row Level Security (RLS) enabled on all tables
- Automatic progress calculation via triggers
- Indexes for performance optimization
- Unique constraints to prevent duplicates

## Frontend Components

### Service Layer (`courseService.ts`)

- `fetchCoursesWithProgress()` - Get all courses with user progress
- `fetchCourseWithModules()` - Get course details with modules
- `fetchModuleWithQuiz()` - Get module with quiz questions
- `completeModule()` - Mark module as completed
- `submitQuizAttempt()` - Submit quiz answers
- `fetchQuizAttempts()` - Get quiz history
- `generateCertificate()` - Create course certificate

### Components Created

1. **QuizComponent** - Interactive quiz with:

   - Multiple choice and true/false questions
   - Progress indicator
   - Real-time scoring
   - Detailed results with explanations
   - Retry functionality

2. **Types** (`courses.ts`) - Comprehensive TypeScript types for:
   - Courses, modules, quizzes
   - Progress tracking
   - Certificates
   - Extended types with relations

## Database Setup

Run the migration:

```sql
-- Execute: supabase/migrations/courses_schema.sql
```

Or in Supabase dashboard:

1. Go to SQL Editor
2. Copy content from `courses_schema.sql`
3. Run the query

## Populating Course Content

### Sample Course Data

```sql
-- Insert sample course
INSERT INTO courses (title, description, category, duration_minutes, difficulty, icon, color, order_index, is_locked)
VALUES (
  'Leadership Foundations',
  'Develop core leadership skills essential for fellowship success',
  'Leadership',
  120,
  'beginner',
  'Users',
  'blue',
  1,
  false
);

-- Insert modules for the course
INSERT INTO course_modules (course_id, title, description, content, order_index, duration_minutes)
VALUES (
  'COURSE_ID_HERE',
  'Introduction to Leadership',
  'Understanding what makes a great leader',
  '{
    "type": "lesson",
    "sections": [
      {
        "type": "text",
        "content": "Leadership is not about being in charge. It is about taking care of those in your charge."
      },
      {
        "type": "callout",
        "callout_type": "tip",
        "content": "Great leaders inspire action through their vision and values."
      }
    ]
  }'::jsonb,
  1,
  15
);

-- Insert quiz questions
INSERT INTO quiz_questions (module_id, question, question_type, options, correct_answer, explanation, points, order_index)
VALUES (
  'MODULE_ID_HERE',
  'What is the primary role of a leader?',
  'multiple_choice',
  '["To give orders", "To inspire and guide others", "To maintain control", "To make all decisions"]'::jsonb,
  'To inspire and guide others',
  'Leadership is about inspiring and guiding others towards a common goal, not just giving orders.',
  1,
  1
);
```

## Features

### For Users

- **Browse Courses**: View all available courses with progress
- **Take Lessons**: Read interactive content with rich formatting
- **Complete Quizzes**: Test knowledge with immediate feedback
- **Track Progress**: See completion percentage and status
- **Earn Certificates**: Get certificates upon course completion
- **Retry Quizzes**: Unlimited attempts to pass

### For Admins (Future)

- Add/edit courses and modules
- Create quiz questions
- View user progress analytics
- Issue certificates manually

## Progress Tracking

### Automatic Updates

- Module completion triggers course progress update
- Progress percentage calculated automatically
- Status changes: not_started → in_progress → completed
- Certificates generated when course reaches 100%

### Quiz System

- Minimum 70% to pass
- Multiple attempts allowed
- Detailed feedback on each question
- Attempt history saved

## Next Steps

### Immediate

1. Run database migration
2. Populate with sample course content
3. Test quiz functionality
4. Verify progress tracking

### Future Enhancements

1. **Lesson Viewer Component** - Rich content display
2. **Certificate Generator** - PDF certificates with design
3. **Course Admin Panel** - Content management interface
4. **Video Integration** - Embed video lessons
5. **Discussion Forums** - Per-module discussions
6. **Peer Review** - Student-to-student feedback
7. **Gamification** - Badges, streaks, leaderboards

## API Endpoints Needed

If using Supabase Edge Functions:

### `get-course-content`

- Fetch course with all modules and progress
- Check prerequisites
- Return locked/unlocked status

### `submit-module-completion`

- Mark module as complete
- Update time spent
- Trigger progress calculation

### `generate-certificate`

- Create PDF certificate
- Store in Supabase Storage
- Send email notification

## Security

### RLS Policies

- ✅ Users can only view/edit their own progress
- ✅ Course content is public (read-only)
- ✅ Quiz answers are validated server-side
- ✅ Certificates are publicly viewable but only user can generate

### Validation

- Quiz answers checked against correct_answer
- Progress updates require authentication
- Certificate generation requires 100% completion

## Cost Considerations

### Supabase

- Database: Minimal (mostly text content)
- Storage: Certificates (if storing PDFs)
- Functions: Certificate generation

### Recommendations

- Store lesson content as JSONB (efficient)
- Use Supabase Storage for certificate PDFs
- Cache course content on frontend
- Lazy load modules as needed

## Testing Checklist

- [ ] Create sample course
- [ ] Add modules with lessons
- [ ] Create quiz questions
- [ ] Test user enrollment
- [ ] Complete a module
- [ ] Take and pass a quiz
- [ ] Verify progress updates
- [ ] Complete entire course
- [ ] Check certificate generation
- [ ] Test on mobile devices

---

**Status**: Core infrastructure complete. Ready for content population and UI integration.
