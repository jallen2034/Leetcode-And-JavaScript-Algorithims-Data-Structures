class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function buildLinkedList(vals: number[], pos: number): ListNode | null {
  if (vals.length === 0) return null;

  const head = new ListNode(vals[0]);

  let tail = head;

  let cycleTarget: ListNode | null = pos === 0 ? head : null;

  for (let i = 1; i < vals.length; i++) {
    tail.next = new ListNode(vals[i]);
    tail = tail.next;

    if (i === pos) {
      cycleTarget = tail;
    }
  }

  tail.next = cycleTarget;
  return head;
}

function check(testNo: number, actual: boolean, expected: boolean): void {
  const status = actual === expected ? "PASS" : "FAIL";
  console.log(`Test ${testNo}: ${status}  (got ${actual}, expected ${expected})`);
}

const hasCycleAhhSloppy = (head: ListNode | null): boolean => {
  const vistedNodes: any = [];

  let currentNode: ListNode = head;

  while (currentNode !== null) {
    if (vistedNodes.includes(currentNode)) {
      return true;
    } else {
      vistedNodes.push(currentNode);
      currentNode = currentNode.next;
    }
  }

  return false;
}

const hasCycleFloydPog = (head: ListNode | null): boolean => {
  let slowNode: ListNode | null = head;
  let fastNode: ListNode | null = head;

  while (fastNode != null && fastNode.next !== null) {
    slowNode = slowNode.next;
    fastNode = fastNode.next.next;

    if (slowNode === fastNode) {
      return true;
    }
  }

  return false;
}

const list1 = buildLinkedList([3, 2, 0, -4], 1);
const list2 = buildLinkedList([1, 2], 0);
const list3 = buildLinkedList([1], -1);
const list4 = buildLinkedList([], -1);

check(1, hasCycleFloydPog(list1), true);
check(2, hasCycleFloydPog(list2), true);
check(3, hasCycleFloydPog(list3), false);
check(4, hasCycleFloydPog(list4), false);

const list5 = buildLinkedList(
  [-21, 10, 17, 8, 4, 26, 5, 35, 33, -7, -16, 27, -12, 6, 29, -12, 5, 9, 20, 14, 14, 2, 13, -24, 21, 23, -21, 5],
  -1
);

check(5, hasCycleFloydPog(list5), false);