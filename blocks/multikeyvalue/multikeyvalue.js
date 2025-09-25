function addLabels(fields, block, tableRowCounter, containerLabel = null) {
  // go over all fields 
  fields.forEach(field => {

    // tab and classes fields are not rendered in the table rows
    if (field.component === 'tab' || field.name.startsWith('classes')) {
      return;
    }

    // if the field name includes a _,
    if (field.name.includes('_')) {
      // extract group name
      const groupName = field.name.split('_')[0];
      // is there already a label with that group name?
      let label = document.querySelector(`.grouping-${groupName}`);
      if(label) {
        // we expect the value to be in this same table cell
        const propertyLabel = document.createElement('div');
        propertyLabel.classList.add(`label`, 'property');
        propertyLabel.appendChild(document.createTextNode(`PROPERTY: ${field.name}`));
        label.appendChild(propertyLabel);
        return;
      } else {
        // add a new label with the group name and field name
        label = document.createElement('div');
        label.classList.add(`label`, `grouping-${groupName}`);
        label.appendChild(document.createTextNode(`GROUP: ${groupName}`));
        // we expect the value to be in this same table cell
        const propertyLabel = document.createElement('div');
        propertyLabel.classList.add(`label`, 'property');
        propertyLabel.appendChild(document.createTextNode(`PROPERTY: ${field.name}`));
        label.appendChild(propertyLabel);
        if(!containerLabel) {
          block.children[tableRowCounter].firstElementChild.appendChild(label);
          tableRowCounter++;
        } else {
          containerLabel.appendChild(label);
        }
        return;
      }
    }

    // if its a multi container
    if(field.component === 'container') {
      // add a new label with the container name and field name
      let label = document.createElement('div');
      label.classList.add(`label`, `container-${field.name}`);
      label.appendChild(document.createTextNode(`CONTAINER: ${field.name}`));
      label.appendChild(document.createElement('br'));
      block.children[tableRowCounter].firstElementChild.appendChild(label);
      addLabels(field.fields, block, tableRowCounter, label);
      tableRowCounter++;
    }
    

    // add a label with the field name
    const label = document.createElement('div');
    label.classList.add(`label`);
    label.appendChild(document.createTextNode(`PROPERTY: ${field.name}`));
    if(!containerLabel) {
      block.children[tableRowCounter].firstElementChild.appendChild(label);
      tableRowCounter++;
    } else {
      containerLabel.appendChild(label);
    }
  });
}

export default async function decorate(block) {
/*  
  // load the component-models.json file
  const componentModels = await fetch(`${window.hlx.codeBasePath}/component-models.json`);
  if (!componentModels.ok) return;
  
  const data = await componentModels.json();
  // find the multi model
  const multiModel = data.find(model => model.id === 'multi');
  if (!multiModel) return;


  // if one of the multiModel fields is components=container and multi!=true
  // then replace this container field with the fields that ar inside this container
  let flattenedFields = [];
  multiModel.fields.forEach(field => {
    if (field.component === 'container' && !field?.multi) {
      flattenedFields.push(...field.fields);
    } else {
      flattenedFields.push(field);
    }
  });

  let tableRowCounter = 0;

  addLabels(flattenedFields, block, tableRowCounter);

  */
  // create block header with block options
  const blockOptionDiv = document.createElement('div');
  blockOptionDiv.classList.add('block-options');
  const value = document.createElement('div');

  let classes = Array.from(block.classList)
    .filter(cls => cls !== 'block' && cls !== 'multikeyvalue');
  value.textContent = `Key Value Block (${classes.join(' ')})`;

  blockOptionDiv.append(value);
  // append div as first child of block
  block.insertBefore(blockOptionDiv, block.firstChild);
}
