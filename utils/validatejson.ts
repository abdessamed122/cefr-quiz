
// function validateQuizData(rawJson) {
//   try {
//     const data = JSON.parse(rawJson);

//     const isValid = Array.isArray(data) && data.every(q =>
//       typeof q.id === 'number' &&
//       typeof q.question === 'string' &&
//       Array.isArray(q.options) &&
//       q.options.length === 4 &&
//       q.options.every(opt => typeof opt === 'string') &&
//       typeof q.answer === 'string' &&
//       typeof q.level === 'string'
//     );

//     return isValid ? data : null;

//   } catch (err) {
//     console.error("Invalid JSON:", err);
//     return null;
//   }
// }

// // إصلاح بعض الأخطاء الشائعة (مثلاً, حذف الأسطر غير الكاملة)
// let cleanedJson = rawJson.replace(/"level":\s*$/, '"level": "A1"')  // مؤقتًا
//                          .replace(/"options":\s*\[[^]*?[^,\]]/, match => {
//                            return `"options": [` + match.split('[')[1].split(']')[0].split(',').slice(0, 4).join(',') + `]`
//                          });
