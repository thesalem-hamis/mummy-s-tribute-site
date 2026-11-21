-- Create tributes table
CREATE TABLE IF NOT EXISTS public.tributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    zone TEXT,
    role TEXT NOT NULL CHECK (role IN ('Teenager', 'Youth', 'Church member', 'Leader / Pastor', 'Family & friend')),
    message TEXT NOT NULL,
    hearts INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_tributes_created_at ON public.tributes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tributes_role ON public.tributes (role);
CREATE INDEX IF NOT EXISTS idx_tributes_zone ON public.tributes (zone);

-- Create tribute_stats table for total count
CREATE TABLE IF NOT EXISTS public.tribute_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    total BIGINT NOT NULL DEFAULT 0
);

-- Initialize tribute_stats if empty
INSERT INTO public.tribute_stats (id, total) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Create zone_stats table for zone leaderboard
CREATE TABLE IF NOT EXISTS public.zone_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL UNIQUE,
    total BIGINT NOT NULL DEFAULT 0
);

-- Function to update tribute_stats on insert
CREATE OR REPLACE FUNCTION public.increment_tribute_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.tribute_stats SET total = total + 1 WHERE id = 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update zone_stats on insert
CREATE OR REPLACE FUNCTION public.increment_zone_total()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.zone IS NOT NULL AND NEW.zone != '' THEN
        INSERT INTO public.zone_stats (label, total)
        VALUES (NEW.zone, 1)
        ON CONFLICT (label) DO UPDATE SET total = zone_stats.total + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
DROP TRIGGER IF EXISTS on_tribute_insert ON public.tributes;
CREATE TRIGGER on_tribute_insert
    AFTER INSERT ON public.tributes
    FOR EACH ROW EXECUTE FUNCTION public.increment_tribute_total();

DROP TRIGGER IF EXISTS on_tribute_insert_zone ON public.tributes;
CREATE TRIGGER on_tribute_insert_zone
    AFTER INSERT ON public.tributes
    FOR EACH ROW EXECUTE FUNCTION public.increment_zone_total();

-- RPC function to send heart (increment hearts count)
CREATE OR REPLACE FUNCTION public.send_heart(tribute_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.tributes SET hearts = hearts + 1 WHERE id = tribute_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribute_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zone_stats ENABLE ROW LEVEL SECURITY;

-- Policies: Allow public read access
CREATE POLICY "Public read tributes" ON public.tributes FOR SELECT USING (true);
CREATE POLICY "Public read tribute_stats" ON public.tribute_stats FOR SELECT USING (true);
CREATE POLICY "Public read zone_stats" ON public.zone_stats FOR SELECT USING (true);

-- Policies: Allow public insert for tributes
CREATE POLICY "Public insert tributes" ON public.tributes FOR INSERT WITH CHECK (true);

-- Policies: Allow public update for hearts (via RPC)
CREATE POLICY "Public update hearts" ON public.tributes FOR UPDATE USING (true) WITH CHECK (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.tributes TO anon, authenticated;
GRANT SELECT ON public.tribute_stats TO anon, authenticated;
GRANT SELECT ON public.zone_stats TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.send_heart(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_tribute_total() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_zone_total() TO anon, authenticated;