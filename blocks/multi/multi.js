export default async function decorate(block) {
  

  // load the component-models.json file
  const componentModels = await fetch(`${window.hlx.codeBasePath}/component-models.json`);
  if (componentModels.ok) {
      const data = await componentModels.json();
      // find the multi model
      const multiModel = data.find(model => model.id === 'multi');
      // get the list of filed names , except for the ones where the component is set to tab
      const fieldNames = multiModel.fields.filter(field => field.component !== 'tab' && !field.name.startsWith('classes')).map(field => field.name);
      // to each row in the block add a div with then name of the field
      let previousGroupName = '';
      let previousDiv = null;
      let rowIndex = 0;
      fieldNames.forEach((fieldName, index) => {
        // if it has a grouping prefix
        if (fieldName.includes('_')) {
          const groupName = fieldName.split('_')[0];
          if (groupName === previousGroupName) {
            previousDiv.appendChild(document.createElement('br'));
            previousDiv.appendChild(document.createTextNode(fieldName));
          } else {
            const div = document.createElement('div');
            div.textContent = fieldName;
            block.children[rowIndex].insertBefore(div, block.children[rowIndex].firstChild);
            previousGroupName = groupName;
            previousDiv = div;
            rowIndex++;
          }
        } else {
          previousGroupName = '';
          previousDiv = null;
          const div = document.createElement('div');
          div.textContent = fieldName;
          // add as first child of row
          block.children[rowIndex].insertBefore(div, block.children[rowIndex].firstChild);
          rowIndex++;
        }
      });
    }

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
