const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { OpenAI } = require('openai');

admin.initializeApp();
const db = admin.firestore();

// Make sure you run: firebase functions:config:set openai.key="YOUR_KEY" later
const openai = new OpenAI({
  apiKey: functions.config().openai.key,
});

exports.askAI = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be logged in.');
    }

    const userId = context.auth.uid;
    const userMessage = data.message;

    const historySnapshot = await db.collection('orders')
        .where('customerId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get();
        
    const historyText = historySnapshot.docs.map(doc => doc.data().items).join(", ");

    const systemPrompt = `You are the LocalLink Food Concierge in Mbombela. 
    User's recent order history: ${historyText}.
    Provide recommendations. If the user asks for budget, stay under their amount. 
    Be polite and professional.`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": userMessage}
            ],
        });
        return { reply: completion.choices[0].message.content };
    } catch (error) {
        console.error("AI Error:", error);
        throw new functions.https.HttpsError('internal', 'AI service unavailable.');
    }
});

