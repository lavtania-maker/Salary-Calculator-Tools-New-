async function run() {
  const slug = "annual-leave-al-in-malaysia-entitlement-rules-how-to-calculate";
  const url = `https://firestore.googleapis.com/v1/projects/gen-lang-client-0273291777/databases/ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918/documents:runQuery`;
  
  const body = {
    structuredQuery: {
      from: [{ collectionId: "blog_posts" }],
      where: {
        compositeFilter: {
          op: "AND",
          filters: [
            { fieldFilter: { field: { fieldPath: "slug" }, op: "EQUAL", value: { stringValue: slug } } },
            { fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "published" } } }
          ]
        }
      },
      limit: 1
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  console.log(JSON.stringify(data).substring(0, 500));
}
run();
