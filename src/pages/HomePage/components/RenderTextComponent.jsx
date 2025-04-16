const RenderTextComponent = (child) => {
  switch (child.value) {
    case "Headline":
      return (
        <h1
          key={child.id}
          contentEditable={true}
          className="text-2xl font-bold h-full focus:outline-0 focus:border-0"
        >
          Headline Text
        </h1>
      );
    case "Sub-header":
      return (
        <h3
          key={child.id}
          contentEditable={true}
          className="text-lg font-semibold h-full focus:outline-0 focus:border-0"
        >
          Sub-Header Text
        </h3>
      );
    case "Body":
      return (
        <p
          key={child.id}
          contentEditable={true}
          className="text-base h-full focus:outline-0 focus:border-0"
        >
          Body Text
        </p>
      );
    default:
      return <div key={child.id}>Type Here...</div>;
  }
};

export default RenderTextComponent;
