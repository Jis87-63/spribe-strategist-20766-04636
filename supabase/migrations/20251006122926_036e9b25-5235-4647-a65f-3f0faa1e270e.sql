-- Adicionar política de INSERT para permitir que qualquer pessoa insira sinais
CREATE POLICY "Anyone can insert signals"
ON public.signals
FOR INSERT
WITH CHECK (true);