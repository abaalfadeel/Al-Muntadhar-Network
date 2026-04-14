  useEffect(() => {
    // استخدم import.meta.env.BASE_URL لضمان عمل المسار في السيرفر المحلي وعلى Github Pages
    const baseUrl = import.meta.env.BASE_URL;
    
    fetch(`${baseUrl}data/mukhalifeen.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data: ", err);
        setLoading(false);
      });
  }, []);
