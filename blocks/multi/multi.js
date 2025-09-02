export default function decorate(block) {
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
