import {
  defineStore,
} from "pinia";
import {
  ref,
} from "vue";

const PATH_SEP_RE = /[\\/]/;

export type CanvasNode = {
  id: string;
  filePath: string;
  nodeKey: string;
  label: string;
  x: number;
  y: number;
};

export const useCanvasNodesStore = defineStore(
  "canvas-nodes",
  () => {
    const nodes = ref<CanvasNode[]>([]);

    const CARD_WIDTH = 1440;
    const CARD_GAP = 40;

    function addNode(
      filePath: string,
      nodeKey: string,
    ) {
      const label = filePath.split(PATH_SEP_RE).pop() ?? filePath;

      let x = 40;
      let y = 40;

      if (nodes.value.length > 0) {
        const rightmost = nodes.value.reduce((
          prev,
          curr,
        ) => curr.x > prev.x ? curr : prev);
        x = rightmost.x + CARD_WIDTH + CARD_GAP;
        y = rightmost.y;
      }

      nodes.value.push({
        id: crypto.randomUUID(),
        filePath,
        nodeKey,
        label,
        x,
        y,
      });
    }

    function removeNode(id: string) {
      nodes.value = nodes.value.filter(n => n.id !== id);
    }

    function updatePosition(
      id: string,
      x: number,
      y: number,
    ) {
      const node = nodes.value.find(n => n.id === id);
      if (node) {
        node.x = x;
        node.y = y;
      }
    }

    return {
      nodes,
      addNode,
      removeNode,
      updatePosition,
    };
  },
);
