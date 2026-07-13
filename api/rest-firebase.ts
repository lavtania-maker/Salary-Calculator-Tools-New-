export async function fetchBlogPostsRest(slug?: string) {
  const url = `https://firestore.googleapis.com/v1/projects/gen-lang-client-0273291777/databases/ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918/documents:runQuery`;
  
  const body: any = {
    structuredQuery: {
      from: [{ collectionId: "blog_posts" }],
      where: {
        fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "published" } }
      }
    }
  };

  if (slug) {
    body.structuredQuery.where = {
      compositeFilter: {
        op: "AND",
        filters: [
          { fieldFilter: { field: { fieldPath: "slug" }, op: "EQUAL", value: { stringValue: slug } } },
          { fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "published" } } }
        ]
      }
    };
    body.structuredQuery.limit = 1;
  } else {
    // If not ordering, it might be safer to remove order if there's no index, but we have index.
    body.structuredQuery.orderBy = [
      { field: { fieldPath: "publishedAt" }, direction: "DESCENDING" }
    ];
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.warn("REST API fallback for orderBy:", errText);
    // fallback if missing index
    delete body.structuredQuery.orderBy;
    const res2 = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res2.ok) {
        throw new Error(`REST API Error: ${res2.status}`);
    }
    const data2 = await res2.json();
    if (!data2 || data2.length === 0 || !data2[0].document) return [];
    let parsed = data2.filter((item: any) => item.document).map((item: any) => parseRestDocument(item.document));
    parsed.sort((a: any, b: any) => (b.publishedAt || '') > (a.publishedAt || '') ? 1 : -1);
    return parsed;
  }

  const data = await res.json();
  if (!data || data.length === 0 || !data[0].document) {
    return [];
  }
  
  return data.filter((item: any) => item.document).map((item: any) => parseRestDocument(item.document));
}

function parseRestDocument(doc: any) {
  const obj: any = { id: doc.name.split('/').pop() };
  if (!doc.fields) return obj;
  
  for (const [key, val] of Object.entries(doc.fields as any)) {
    const type = Object.keys(val as any)[0];
    const rawVal = (val as any)[type];
    if (type === 'stringValue') obj[key] = rawVal;
    else if (type === 'timestampValue') obj[key] = rawVal;
    else if (type === 'booleanValue') obj[key] = rawVal;
    else if (type === 'integerValue') obj[key] = parseInt(rawVal, 10);
    else if (type === 'doubleValue') obj[key] = rawVal;
    else if (type === 'arrayValue') {
      obj[key] = (rawVal.values || []).map((v: any) => v.stringValue || v.timestampValue || v.integerValue || v.booleanValue);
    }
  }
  return obj;
}
