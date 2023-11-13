import { app } from "../../scripts/app.js";

function compareInputs({node: node1, slot: slot1}, {node: node2, slot: slot2})
{
  // Handle inputs of nodes first that have been added first
  if (node1.id != node2.id)
    return node1.id - node2.id;

  // Handle slots according to their order in the node
  return slot1 - slot2;
}

function compareOutputs({node: inputNode}, {node: node1, slot: slot1}, {node: node2, slot: slot2})
{
  // Prioritize outputs without connections
  let connected1 = node1.isOutputConnected(slot1);
  let connected2 = node2.isOutputConnected(slot2);
  if (connected1 != connected2)
    return connected1 - connected2;

  // Prioritize outputs closer to the input, preferably added before it
  let distance1 = inputNode.id > node1.id ? inputNode.id - node1.id : (node1.id - inputNode.id) * 2;
  let distance2 = inputNode.id > node2.id ? inputNode.id - node2.id : (node2.id - inputNode.id) * 2;
  if (distance1 != distance2)
    return distance1 - distance2;

  // Handle slots according to their order in the node
  return slot1 - slot2;
}

function doConnect()
{
  let inputs = [];
  let outputs = [];
  for (let node of app.graph._nodes)
  {
    if (node.inputs)
      for (let i = 0; i < node.inputs.length; i++)
        if (!node.isInputConnected(i))
          inputs.push({node, slot: i});
    if (node.outputs)
      for (let i = 0; i < node.outputs.length; i++)
        outputs.push({node, slot: i});
  }

  inputs.sort(compareInputs);
  for (let input of inputs)
  {
    let type = input.node.getInputInfo(input.slot).type;
    let matches = outputs.filter(output => output.node.getOutputInfo(output.slot).type == type && output.node != input.node);
    matches.sort(compareOutputs.bind(null, input));

    if (matches.length > 0)
      matches[0].node.connect(matches[0].slot, input.node, input.slot);
  }
}

const ext = {
  name: "AutoConnect",
  async setup()
  {
    let button = document.createElement("button");
    button.id = "autoconnect-button";
    button.textContent = "Autoconnect";
    button.addEventListener("click", doConnect);
    document.querySelector("div.comfy-menu").appendChild(button);

    window.addEventListener("keydown", event =>
    {
      if (event.key.toUpperCase() == "A" && event.altKey && !event.ctrlKey && !event.metaKey)
      {
        event.preventDefault();
        doConnect();
      }
    });
  },
};

app.registerExtension(ext);
