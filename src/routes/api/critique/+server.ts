import { formattingPrompt, llm, pickPersona } from '$lib/mistral';
import { submittedWorkSchema } from '$lib/schema/submittedWork';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { text, persona } = await request.json();
	const inputData = submittedWorkSchema.safeParse({ text, persona });

	if (!inputData.success) {
		const errors = inputData.error.errors.map((error) => {
			return {
				field: error.path[0],
				message: error.message
			};
		});

		return error(400, JSON.stringify(errors));
	}

	const prompt = `${pickPersona(persona)} ${formattingPrompt}`;
	const aiResponse = await llm.invoke(['system', prompt, 'human', text]);

	return json(aiResponse);
};
