interface TableFooterProps {
  handleClick: () => void;
  isLoading: boolean;
  nextPage: number | null;
}

export const TableFooter = ({
  handleClick,
  isLoading,
  nextPage,
}: TableFooterProps) => {
  return (
    <tfoot>
      <tr>
        <td colSpan={5}>
          <button
            onClick={handleClick}
            disabled={isLoading || nextPage === null}
          >
            Load more
          </button>
        </td>
      </tr>
    </tfoot>
  );
};
