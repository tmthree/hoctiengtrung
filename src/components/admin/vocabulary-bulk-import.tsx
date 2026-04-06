"use client";
import { useState, useRef } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bulkImportVocabulary } from "@/lib/actions/admin-vocabulary-actions";
import { bulkImportRowSchema, type BulkImportRow } from "@/lib/validators/admin";
import { Upload, CheckCircle, XCircle } from "lucide-react";

interface ParsedRow extends Partial<BulkImportRow> {
  _errors?: string[];
  _valid?: boolean;
}

interface Props {
  onClose?: () => void;
}

export function VocabularyBulkImport({ onClose }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ count?: number; errors?: string[]; error?: string } | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResult(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const parsed = (res.data as Record<string, string>[]).map((row) => {
          const attempt = bulkImportRowSchema.safeParse({
            ...row,
            hskLevel: Number(row.hskLevel),
          });
          if (attempt.success) {
            return { ...attempt.data, _valid: true };
          }
          return {
            ...row,
            _valid: false,
            _errors: attempt.error.issues.map((e) => e.message),
          };
        });
        setRows(parsed);
      },
    });
  }

  async function handleImport() {
    const validRows = rows
      .filter((r) => r._valid)
      .map(({ _valid: _, _errors: __, ...rest }) => rest as BulkImportRow);

    if (validRows.length === 0) return;
    setImporting(true);
    try {
      const res = await bulkImportVocabulary(validRows);
      setResult(res);
    } finally {
      setImporting(false);
    }
  }

  const validCount = rows.filter((r) => r._valid).length;
  const invalidCount = rows.filter((r) => !r._valid).length;

  return (
    <div className="space-y-4">
      <div className="rounded-md border-2 border-dashed p-6 text-center">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-3">
          CSV cần có các cột: simplified, traditional, pinyin, meaning, hskLevel, category
        </p>
        <Button variant="outline" onClick={() => fileRef.current?.click()}>
          Chọn file CSV
        </Button>
        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
      </div>

      {rows.length > 0 && (
        <>
          <div className="flex gap-3 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-4 w-4" /> {validCount} hợp lệ
            </span>
            {invalidCount > 0 && (
              <span className="flex items-center gap-1 text-destructive">
                <XCircle className="h-4 w-4" /> {invalidCount} lỗi
              </span>
            )}
          </div>

          <div className="max-h-64 overflow-auto rounded-md border">
            <table className="w-full text-xs">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left px-3 py-2">Trạng thái</th>
                  <th className="text-left px-3 py-2">Giản thể</th>
                  <th className="text-left px-3 py-2">Pinyin</th>
                  <th className="text-left px-3 py-2">Nghĩa</th>
                  <th className="text-left px-3 py-2">HSK</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((row, i) => (
                  <tr key={i} className={row._valid ? "" : "bg-destructive/5"}>
                    <td className="px-3 py-1.5">
                      {row._valid ? (
                        <Badge variant="default" className="text-xs">OK</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs" title={row._errors?.join(", ")}>Lỗi</Badge>
                      )}
                    </td>
                    <td className="px-3 py-1.5">{row.simplified}</td>
                    <td className="px-3 py-1.5">{row.pinyin}</td>
                    <td className="px-3 py-1.5">{row.meaning}</td>
                    <td className="px-3 py-1.5">{row.hskLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result && (
            <div className={`rounded-md p-3 text-sm ${result.error ? "bg-destructive/10 text-destructive" : "bg-green-50 text-green-700"}`}>
              {result.error
                ? `Lỗi: ${result.error}`
                : `Nhập thành công ${result.count} từ vựng`}
              {result.errors && result.errors.length > 0 && (
                <ul className="mt-1 list-disc pl-4 text-xs">
                  {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={handleImport} disabled={importing || validCount === 0}>
              {importing ? "Đang nhập..." : `Nhập ${validCount} từ`}
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>Đóng</Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
