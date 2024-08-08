import { Persona } from '$lib/enums/Persona';
import { z } from 'zod';

export const submittedWorkSchema = z.object({
	text: z.string().min(100).max(5000),
	persona: z.nativeEnum(Persona)
});
