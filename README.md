# AutoConnect for ComfyUI

This extension will add an Autoconnect button to ComfyUI’s application menu. When clicked (or when the Alt-A shortcut key is pressed), the extension will try to match any inputs not yet connected to the available outputs and create the corresponding links. While the heuristics involved might occasionally go wrong for complicated workflows, they usually connect nodes as intended.

Before clicking Autoconnect:

![The default ComfyUI workflow without any of the links](before.png)

After clicking Autoconnect:

![The default ComfyUI workflow with all the links, particular: both text encode prompts connected to the CLIP output of the checkpoint loader, output of the first prompt connected to the positive input of KSampler, output of the second prompt to its negative input.](after.png)

## Installation

To install, clone this repository into `ComfyUI/web/extensions` folder with `git clone https://github.com/palant/autoconnect-comfyui` and reload ComfyUI in the browser.
