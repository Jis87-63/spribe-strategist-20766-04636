-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view signals" ON public.signals;
DROP POLICY IF EXISTS "Anyone can create signals" ON public.signals;
DROP POLICY IF EXISTS "Anyone can delete signals" ON public.signals;

-- Drop table if exists to recreate fresh
DROP TABLE IF EXISTS public.signals;

-- Create signals table
CREATE TABLE public.signals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  multiplier DECIMAL(10, 2) NOT NULL,
  confidence INTEGER NOT NULL,
  time_window TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  result TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read signals (public feature)
CREATE POLICY "Anyone can view signals" 
ON public.signals 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert signals (for the generator)
CREATE POLICY "Anyone can create signals" 
ON public.signals 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to delete signals (for admin panel)
CREATE POLICY "Anyone can delete signals" 
ON public.signals 
FOR DELETE 
USING (true);

-- Enable realtime for signals table
ALTER PUBLICATION supabase_realtime ADD TABLE public.signals;

-- Create index for performance
CREATE INDEX idx_signals_created_at ON public.signals(created_at DESC);
CREATE INDEX idx_signals_expires_at ON public.signals(expires_at);