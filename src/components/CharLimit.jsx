export default function CharLimit() {


    function Input({ characterLimit }) {

        const handleChange = (event, characterLimit) => {
        if (event.target.value.length > characterLimit) {
          console.log('revent', event)
          alert("Character limit exceeded");
        }
      };
        return <input onChange={(event) => handleChange(event, characterLimit)} placeholder="Enter some text" />;
      }


    return (
      <section>
        <h1>Character Limit</h1>
        <Input characterLimit={20} />
      </section>
    );
  }
