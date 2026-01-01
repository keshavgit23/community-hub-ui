-- Drop existing policies and recreate with authenticated-only access

-- Posts policies
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;

CREATE POLICY "Authenticated users can view posts" 
ON public.posts 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create posts" 
ON public.posts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" 
ON public.posts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts" 
ON public.posts 
FOR DELETE 
TO authenticated
USING (auth.uid() = author_id);

-- Events policies
DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can create events" ON public.events;
DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;

CREATE POLICY "Authenticated users can view events" 
ON public.events 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create events" 
ON public.events 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Users can update their own events" 
ON public.events 
FOR UPDATE 
TO authenticated
USING (auth.uid() = organizer_id);

CREATE POLICY "Users can delete their own events" 
ON public.events 
FOR DELETE 
TO authenticated
USING (auth.uid() = organizer_id);

-- Profiles policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id);