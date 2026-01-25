import type {
  useDelete,
} from "../queries";

export async function deleteFileEntry(
  deleteFn: ReturnType<typeof useDelete>,
  path: string,
) {
  await deleteFn.mutateAsync({
    path,
  });
}
