export default async function decorate(block) {
  

  // load the component-models.json file
 /* const componentModels = await fetch(`${window.hlx.codeBasePath}/component-models.json`);
  if (componentModels.ok) {
      const data = await componentModels.json();
      // find the multi model
      const multiModel = data.find(model => model.id === 'multi');
      // get the list of filed names , except for the ones where the component is set to tab
      const fieldNames = multiModel.fields.filter(field => field.component !== 'tab' && !field.name.startsWith('classes')).map(field => field.name);
      // to each row in the block add a div with then name of the field
      block.querySelectorAll(':scope > div').forEach((row, index) => {
          const div = document.createElement('div');
          div.textContent = fieldNames[index];
          // add as first child of row
          row.insertBefore(div, row.firstChild);
      });
    }
  */
 
    // create block header with block options
  const div = document.createElement('div');
  div.classList.add('block-options');
  const key = document.createElement('div');
  key.textContent = 'Block Options';
  const value = document.createElement('div');

  let classes = Array.from(block.classList)
    .filter(cls => cls !== 'block' && cls !== 'multi');
  value.textContent = classes.join(' ');

  div.append(key, value);
  // append div as first child of block
  block.insertBefore(div, block.firstChild);
}
